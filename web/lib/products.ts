export type Product = {
  id: string;
  name: string;
  category: "kitchen" | "home" | "pantry" | "stationery";
  /** Price in cents to avoid floating-point drift. */
  price: number;
  description: string;
  /** Tile background used in place of photography. */
  tint: string;
};

/** Slim shape returned by the search API — keeps 10k-item payloads lean. */
export type ProductSummary = Pick<
  Product,
  "id" | "name" | "category" | "price" | "tint"
>;

/** Total catalog size the store is exercised against. */
export const CATALOG_SIZE = 10_000;

export const curatedProducts: Product[] = [
  {
    id: "enamel-kettle",
    name: "Enamel Pour-Over Kettle",
    category: "kitchen",
    price: 4800,
    description:
      "A slow-spout kettle in speckled cream enamel. Holds a litre, pours like it has all morning.",
    tint: "#d9a066",
  },
  {
    id: "stoneware-mugs",
    name: "Stoneware Mug Set",
    category: "kitchen",
    price: 3200,
    description:
      "Four hand-thrown mugs with a raw clay foot and a glossy oat glaze. No two rims agree exactly.",
    tint: "#c4b49a",
  },
  {
    id: "olivewood-board",
    name: "Olivewood Serving Board",
    category: "kitchen",
    price: 5400,
    description:
      "Cut from a single plank of Andalusian olivewood, grain running the long way. Oil it once a season.",
    tint: "#a98d5f",
  },
  {
    id: "linen-apron",
    name: "Linen Cross-Back Apron",
    category: "kitchen",
    price: 3800,
    description:
      "Stonewashed flax linen with no neck strap to fuss with. Softens with every wash.",
    tint: "#9aa78e",
  },
  {
    id: "beeswax-tapers",
    name: "Beeswax Taper Candles",
    category: "home",
    price: 1800,
    description:
      "Six hand-dipped tapers in raw honey yellow. They burn slow, drip little, and smell faintly of summer.",
    tint: "#e0b94f",
  },
  {
    id: "palm-basket",
    name: "Woven Palm Basket",
    category: "home",
    price: 4200,
    description:
      "Woven flat then blocked into shape, with leather handles that darken as you carry it.",
    tint: "#c79b73",
  },
  {
    id: "cast-iron-trivet",
    name: "Cast Iron Trivet",
    category: "kitchen",
    price: 2400,
    description:
      "A sand-cast lattice that takes a scorching pot without complaint. Heavier than it looks.",
    tint: "#8b8478",
  },
  {
    id: "coffee-beans",
    name: "Single-Origin Coffee Beans",
    category: "pantry",
    price: 2100,
    description:
      "A 340g bag from one hillside in Minas Gerais. Roasted light — think stone fruit, not smoke.",
    tint: "#a4653c",
  },
  {
    id: "orange-blossom-honey",
    name: "Orange Blossom Honey",
    category: "pantry",
    price: 1600,
    description:
      "Raw and unfiltered, from hives kept beside a citrus grove. Crystallizes; that's the good sign.",
    tint: "#dd9a3e",
  },
  {
    id: "cotton-throw",
    name: "Recycled Cotton Throw",
    category: "home",
    price: 6400,
    description:
      "Loom-woven from offcut cotton in ecru and rust stripe. Big enough for two, argued over by three.",
    tint: "#bf7350",
  },
  {
    id: "field-notebooks",
    name: "Field Notebook Trio",
    category: "stationery",
    price: 1500,
    description:
      "Three pocket notebooks with dot grids and stitched spines. Paper takes fountain pen without bleed.",
    tint: "#7f9187",
  },
  {
    id: "brass-clips",
    name: "Brass Page Clips",
    category: "stationery",
    price: 1200,
    description:
      "A tin of twelve solid brass clips that hold ten pages and outlive every notebook they mark.",
    tint: "#c2a34e",
  },
];

// ---------------------------------------------------------------------------
// Generated catalog. Everything below is deterministic (seeded PRNG, index
// arithmetic) so the server, the client, and every build agree on the data.
// ---------------------------------------------------------------------------

const ADJECTIVES = [
  "Hand-Thrown", "Stonewashed", "Waxed", "Riveted", "Split-Oak", "Hammered",
  "Unbleached", "Salt-Glazed", "Oiled", "Pressed", "Braided", "Fluted",
  "Speckled", "Smoked", "Heirloom", "Quarter-Sawn",
];

const MATERIALS = [
  "Walnut", "Linen", "Stoneware", "Brass", "Copper", "Cedar", "Rattan",
  "Cast Iron", "Terracotta", "Wool", "Beech", "Enamel", "Cork", "Hemp",
  "Porcelain", "Leather",
];

const ITEMS: Record<Product["category"], string[]> = {
  kitchen: [
    "Ladle", "Mixing Bowl", "Butter Dish", "Salt Cellar",
    "Bread Knife", "Colander", "Pepper Mill", "Tea Strainer",
  ],
  home: [
    "Vase", "Wall Hook", "Door Mat", "Plant Mister",
    "Photo Frame", "Candle Holder", "Storage Jar", "Coat Rack",
  ],
  pantry: [
    "Olive Oil", "Sea Salt", "Chili Jam", "Oat Crackers",
    "Dried Figs", "Tomato Passata", "Peppercorn Blend", "Cacao Nibs",
  ],
  stationery: [
    "Sketchbook", "Fountain Pen", "Brass Ruler", "Letter Opener",
    "Pencil Tin", "Ink Pot", "Desk Tray", "Washi Tape",
  ],
};

const DESCRIPTIONS: Record<Product["category"], string> = {
  kitchen:
    "Made for daily cooking, not display shelves. Wipes clean and wears its scratches well.",
  home:
    "Quietly useful around the house. The kind of object you stop noticing and can't do without.",
  pantry:
    "Small-batch and traceable to a single producer. Stock up before the shelf empties.",
  stationery:
    "Desk goods that make slow work pleasant. Built to outlast the projects they witness.",
};

const CATEGORIES: Product["category"][] = [
  "kitchen", "home", "pantry", "stationery",
];

const TINTS = [
  "#d9a066", "#c4b49a", "#a98d5f", "#9aa78e", "#e0b94f", "#c79b73",
  "#8b8478", "#a4653c", "#dd9a3e", "#bf7350", "#7f9187", "#c2a34e",
  "#b08968", "#96876c", "#ad7f5a", "#8f9779",
];

/** Small deterministic PRNG (mulberry32) so generated prices are stable. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateProducts(count: number): Product[] {
  const random = mulberry32(20260819);
  const generated: Product[] = [];
  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[i % CATEGORIES.length];
    const items = ITEMS[category];
    const name = `${ADJECTIVES[i % ADJECTIVES.length]} ${
      MATERIALS[Math.floor(i / ADJECTIVES.length) % MATERIALS.length]
    } ${items[Math.floor(i / 64) % items.length]}`;
    generated.push({
      id: `p-${i + 1}`,
      name,
      category,
      price: 800 + Math.floor(random() * 240) * 50,
      description: DESCRIPTIONS[category],
      tint: TINTS[Math.floor(random() * TINTS.length)],
    });
  }
  return generated;
}

export const products: Product[] = [
  ...curatedProducts,
  ...generateProducts(CATALOG_SIZE - curatedProducts.length),
];

// Precomputed once at module load so each request does a single linear scan
// over ready-made lowercase haystacks instead of lowering strings per hit.
const searchIndex = products.map((product) => ({
  product,
  haystack:
    `${product.name} ${product.category} ${product.description}`.toLowerCase(),
}));

const productsById = new Map(products.map((product) => [product.id, product]));

function toSummary(product: Product): ProductSummary {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    tint: product.tint,
  };
}

export function searchProducts(query: string): ProductSummary[] {
  const q = query.trim().toLowerCase();
  const results: ProductSummary[] = [];
  for (const entry of searchIndex) {
    if (!q || entry.haystack.includes(q)) {
      results.push(toSummary(entry.product));
    }
  }
  return results;
}

export function getProduct(id: string): Product | undefined {
  return productsById.get(id);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
