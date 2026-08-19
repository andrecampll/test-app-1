"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

function Field({
  label,
  ...inputProps
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-sm text-muted mb-1.5">{label}</span>
      <input
        {...inputProps}
        className="w-full h-11 px-4 rounded-sm bg-card border border-line focus:border-accent focus:outline-none transition-colors"
      />
    </label>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);

  function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No payment backend yet — mint a fake order number and empty the basket.
    setOrderId(`FE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    clear();
  }

  if (orderId) {
    return (
      <div className="py-24 max-w-xl text-center mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
          Order {orderId}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight">
          Obrigado<span className="text-accent">!</span>
        </h1>
        <p className="mt-5 text-lg text-muted">
          Your order is confirmed — or it would be, if this market had a
          payment backend. That part comes later.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 px-8 items-center rounded-full bg-accent text-background font-medium hover:opacity-90 transition"
        >
          Back to the market
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 max-w-xl">
        <h1 className="font-display text-4xl tracking-tight">
          Nothing to check out<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 text-muted text-lg">
          Your basket is empty — fill it first.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 text-accent font-medium hover:underline"
        >
          Browse the market →
        </Link>
      </div>
    );
  }

  return (
    <div className="py-14 sm:py-20">
      <h1 className="font-display text-4xl tracking-tight mb-10">
        Checkout<span className="text-accent">.</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,380px)] gap-12">
        <form onSubmit={placeOrder} className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="font-display text-xl mb-4">
              Where it’s going
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" name="name" autoComplete="name" required />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <Field
              label="Street address"
              name="address"
              autoComplete="street-address"
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field
                label="City"
                name="city"
                autoComplete="address-level2"
                required
              />
              <Field
                label="State"
                name="state"
                autoComplete="address-level1"
                required
              />
              <Field
                label="Postal code"
                name="zip"
                autoComplete="postal-code"
                required
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-xl mb-4">Payment</legend>
            <p className="text-sm text-muted -mt-2">
              Demo mode — nothing is charged and nothing you type here is
              stored or sent anywhere.
            </p>
            <Field
              label="Card number"
              name="card"
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Expiry" name="expiry" placeholder="12/29" required />
              <Field
                label="CVC"
                name="cvc"
                inputMode="numeric"
                placeholder="123"
                required
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="h-12 px-8 rounded-full bg-accent text-background font-medium hover:opacity-90 active:scale-[0.98] transition"
          >
            Place order — {formatPrice(subtotal)}
          </button>
        </form>

        <aside className="lg:border-l lg:border-line lg:pl-12 h-fit">
          <h2 className="font-display text-xl mb-6">Your order</h2>
          <ul className="space-y-3 text-sm">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex justify-between gap-4 text-muted"
              >
                <span>
                  {product.name}{" "}
                  <span className="font-mono">×{quantity}</span>
                </span>
                <span className="font-mono">
                  {formatPrice(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-line mt-6 pt-4">
            <span>Total</span>
            <span className="font-mono text-lg">{formatPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
