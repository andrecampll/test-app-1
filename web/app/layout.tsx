import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Feira — everyday goods, honestly made",
    template: "%s — Feira",
  },
  description:
    "A small market of kitchen, home, pantry, and paper goods. Few things, chosen well.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-10">
            {children}
          </main>
          <footer className="border-t border-line mt-24">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 flex flex-wrap items-baseline justify-between gap-4 text-sm text-muted">
              <p className="font-display text-lg text-foreground">Feira</p>
              <p>Few things, chosen well. Shipping is imaginary for now.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
