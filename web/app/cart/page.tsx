"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { ProductTile } from "@/components/product-tile";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();

  return (
    <div className="py-14 sm:py-20 max-w-3xl">
      <h1 className="font-display text-4xl tracking-tight mb-10">
        Your basket<span className="text-accent">.</span>
      </h1>

      {items.length === 0 ? (
        <div className="border-t border-line pt-10">
          <p className="text-muted text-lg">
            Empty for now — the stalls are just over there.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-accent font-medium hover:underline"
          >
            Browse the market →
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-line border-y border-line">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="py-6 flex gap-5 items-center">
                <Link href={`/products/${product.id}`} className="shrink-0">
                  <ProductTile
                    product={product}
                    className="w-20 h-20 rounded-sm"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-display text-lg hover:text-accent transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="font-mono text-sm text-muted mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-1 border border-line rounded-full">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${product.name}`}
                    onClick={() => setQuantity(product.id, quantity - 1)}
                    className="w-9 h-9 rounded-full hover:bg-accent-soft transition-colors"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-mono text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${product.name}`}
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    className="w-9 h-9 rounded-full hover:bg-accent-soft transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline justify-between pt-8">
            <p className="text-muted">Subtotal</p>
            <p className="font-mono text-2xl">{formatPrice(subtotal)}</p>
          </div>
          <p className="text-sm text-muted mt-1">
            Shipping and taxes are settled at checkout. (They’re zero. It’s a
            demo.)
          </p>

          <Link
            href="/checkout"
            className="mt-8 inline-flex h-12 px-8 items-center rounded-full bg-accent text-background font-medium hover:opacity-90 transition"
          >
            Continue to checkout →
          </Link>
        </>
      )}
    </div>
  );
}
