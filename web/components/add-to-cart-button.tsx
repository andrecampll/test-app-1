"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className="h-12 px-8 rounded-full bg-accent text-background font-medium hover:opacity-90 active:scale-[0.98] transition"
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
