import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { curatedProducts, formatPrice, getProduct } from "@/lib/products";
import { ProductTile } from "@/components/product-tile";
import { AddToCartButton } from "@/components/add-to-cart-button";

type Props = { params: Promise<{ id: string }> };

// Prerender only the curated dozen — the other ~10k generated products
// render on demand rather than ballooning the build.
export function generateStaticParams() {
  return curatedProducts.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <div className="py-14 sm:py-20">
      <Link
        href="/"
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        ← Back to the market
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-8">
        <ProductTile product={product} className="aspect-square rounded-sm" />

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">
            {product.category}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl leading-tight tracking-tight">
            {product.name}
          </h1>
          <p className="font-mono text-xl text-muted mt-4">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-lg leading-relaxed max-w-prose">
            {product.description}
          </p>
          <div className="mt-10">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
