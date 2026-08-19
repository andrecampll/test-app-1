"use client";

import { memo, startTransition, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { formatPrice, type ProductSummary } from "@/lib/products";
import { ProductTile } from "@/components/product-tile";

type SearchForm = { query: string };

const DEBOUNCE_MS = 200;
/** Rough row height (tile + caption + row gap) before real measurement. */
const ROW_ESTIMATE = 340;

/** Tracks how many grid columns fit the list container (1 / 2 / 3). */
function useColumnCount(target: React.RefObject<HTMLElement | null>) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const element = target.current;
    if (!element) return;
    // ResizeObserver delivers an initial entry on observe(), so this also
    // corrects the desktop-first default without a synchronous setState.
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setColumns(width >= 880 ? 3 : width >= 560 ? 2 : 1);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return columns;
}

/**
 * One virtualized row of the grid. Memoized so scrolling (which re-renders
 * the parent as the visible window shifts) skips rows whose slice is
 * unchanged — `products` keeps the same identity between fetches.
 */
const ProductRow = memo(function ProductRow({
  products,
  start,
  columns,
}: {
  products: ProductSummary[];
  start: number;
  columns: number;
}) {
  return (
    <div
      className="grid gap-x-8"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {products.slice(start, start + columns).map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group block"
        >
          <ProductTile
            product={product}
            className="aspect-[4/3] rounded-sm transition-transform duration-300 group-hover:-translate-y-1"
          />
          <div className="flex items-baseline justify-between gap-3 pt-3">
            <h3 className="font-display text-lg leading-snug group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <span className="font-mono text-sm text-muted">
              {formatPrice(product.price)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
});

export function ProductSearch() {
  // The input is uncontrolled (registered with react-hook-form), so typing
  // never re-renders this component; only the debounced commit below does.
  const { register, watch } = useForm<SearchForm>({
    defaultValues: { query: "" },
  });
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ProductSummary[] | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const subscription = watch(({ query: value }) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        startTransition(() => setQuery((value ?? "").trim()));
      }, DEBOUNCE_MS);
    });
    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/products?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data: ProductSummary[]) => {
        startTransition(() => setProducts(data));
      })
      .catch((error) => {
        if (error.name !== "AbortError") setProducts([]);
      });
    return () => controller.abort();
  }, [query]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const columns = useColumnCount(listRef);
  const rowCount = products ? Math.ceil(products.length / columns) : 0;

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => ROW_ESTIMATE,
    overscan: 6,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  // Column changes reshuffle every row's contents, so cached measurements
  // from the old layout no longer apply.
  useEffect(() => {
    virtualizer.measure();
  }, [columns, virtualizer]);

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          placeholder="Search the stalls — try “honey” or “kitchen”"
          className="w-full max-w-md bg-transparent text-lg placeholder:text-muted focus:outline-none"
          {...register("query")}
        />
        <p className="text-sm text-muted whitespace-nowrap">
          {products === null
            ? "…"
            : `${products.length.toLocaleString("en-US")} ${
                products.length === 1 ? "item" : "items"
              }`}
        </p>
      </div>

      {products !== null && products.length === 0 && (
        <p className="py-16 text-center text-muted">
          Nothing at the market matches “{query}”. Try another word.
        </p>
      )}

      <div ref={listRef} className="pt-10">
        <div
          className="relative w-full"
          style={{ height: virtualizer.getTotalSize() }}
        >
          {products &&
            virtualizer.getVirtualItems().map((row) => (
              <div
                key={row.key}
                ref={virtualizer.measureElement}
                data-index={row.index}
                className="absolute top-0 left-0 w-full pb-12"
                style={{
                  transform: `translateY(${
                    row.start - virtualizer.options.scrollMargin
                  }px)`,
                }}
              >
                <ProductRow
                  products={products}
                  start={row.index * columns}
                  columns={columns}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
