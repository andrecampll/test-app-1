import { searchProducts } from "@/lib/products";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  // The catalog is static, so every distinct query is fully cacheable at the
  // CDN — under high traffic almost all requests never reach this handler.
  return Response.json(searchProducts(q), {
    headers: {
      "Cache-Control":
        "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
