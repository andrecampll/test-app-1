import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 max-w-xl">
      <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">404</p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight">
        That stall isn’t here<span className="text-accent">.</span>
      </h1>
      <p className="mt-4 text-muted text-lg">
        Whatever you were after has been moved, sold out, or never existed.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 text-accent font-medium hover:underline"
      >
        Back to the market →
      </Link>
    </div>
  );
}
