import { ProductSearch } from "@/components/product-search";

export default function Home() {
  return (
    <div className="py-14 sm:py-20">
      <section className="max-w-2xl mb-14 sm:mb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
          Open every day
        </p>
        <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] tracking-tight">
          Everyday goods,
          <br />
          honestly made<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 text-lg text-muted max-w-md">
          A small market of kitchen, home, pantry, and paper goods. Few things,
          chosen well.
        </p>
      </section>

      <ProductSearch />
    </div>
  );
}
