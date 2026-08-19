"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/", label: "Shop" },
  { href: "/cart", label: "Cart" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight lowercase"
        >
          feira<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-foreground font-medium"
                  : "text-muted hover:text-foreground transition-colors"
              }
            >
              {link.label}
              {link.href === "/cart" && count > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-accent text-background text-xs font-medium align-middle">
                  {count}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
