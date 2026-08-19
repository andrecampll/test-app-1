import type { Product } from "@/lib/products";

/**
 * Placeholder art: a tinted tile with an oversized serif initial,
 * used everywhere a product photo would go.
 */
export function ProductTile({
  product,
  className = "",
}: {
  product: Pick<Product, "name" | "category" | "tint">;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden flex items-end ${className}`}
      style={{ backgroundColor: product.tint }}
    >
      <span className="font-display text-[7rem] leading-none text-background/40 select-none -mb-6 -ml-2">
        {product.name.charAt(0)}
      </span>
      <span className="absolute top-3 right-3 text-[0.65rem] uppercase tracking-[0.15em] text-background/70">
        {product.category}
      </span>
    </div>
  );
}
