export interface ProductVariant {
  name: string;
  image: string;
  gallery: string[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: "Sale" | "New";
  description: string;
  slug: string;
  tags: string[];
  gallery: string[];
  videos: string[]; // YouTube video IDs
  purchaseLink?: string;
  variantType?: string; // e.g., "Colors", "Flavors", "Sizes"
  variants?: ProductVariant[];
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Film Eyeshadow",
    category: "Lip Gloss",
    price: 23.0,
    oldPrice: 27.0,
    image: "https://picsum.photos/800/1000?random=1",
    badge: "Sale",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut. Eu agam malorum nec. Eu has vide putent, dico option nominati no eam. Ea erant impetus consequuntur eos, velit congue vidisse eos ne.",
    slug: "film-eyeshadow",
    tags: ["Cosmetic", "Make Up"],
    gallery: ["https://picsum.photos/800/1000?random=1", "https://picsum.photos/800/1000?random=101", "https://picsum.photos/800/1000?random=201"],
    variantType: "Colors",
    variants: [
      {
        name: "Classic Pink",
        image: "https://picsum.photos/800/1000?random=1",
        gallery: ["https://picsum.photos/800/1000?random=1", "https://picsum.photos/800/1000?random=101", "https://picsum.photos/800/1000?random=201"]
      },
      {
        name: "Velvet Red",
        image: "https://picsum.photos/800/1000?random=2",
        gallery: ["https://picsum.photos/800/1000?random=2", "https://picsum.photos/800/1000?random=102", "https://picsum.photos/800/1000?random=202"]
      },
      {
        name: "Deep Ocean",
        image: "https://picsum.photos/800/1000?random=3",
        gallery: ["https://picsum.photos/800/1000?random=3", "https://picsum.photos/800/1000?random=103", "https://picsum.photos/800/1000?random=203"]
      }
    ],
    videos: ["EngW7tLk6R8", "a3ICNMQW7Ok"],
    purchaseLink: "#",
    featured: true
  },
  {
    id: 2,
    name: "WILD PALETTES",
    category: "Lip Gloss",
    price: 25.0,
    image: "https://picsum.photos/800/1000?random=4",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut. Eu agam malorum nec. Eu has vide putent, dico option nominati no eam.",
    slug: "wild-palettes",
    tags: ["Cosmetic", "Palettes"],
    gallery: ["https://picsum.photos/800/1000?random=4", "https://picsum.photos/800/1000?random=104", "https://picsum.photos/800/1000?random=204"],
    variantType: "Colors",
    variants: [
      { name: "Forest Green", image: "https://picsum.photos/800/1000?random=4", gallery: ["https://picsum.photos/800/1000?random=4", "https://picsum.photos/800/1000?random=104"] },
      { name: "Earth Brown", image: "https://picsum.photos/800/1000?random=5", gallery: ["https://picsum.photos/800/1000?random=5", "https://picsum.photos/800/1000?random=105"] }
    ],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: true
  },
  {
    id: 3,
    name: "ROSE SAFARI",
    category: "Lip Gloss",
    price: 35.0,
    image: "https://picsum.photos/800/1000?random=6",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut. Eu agam malorum nec.",
    slug: "rose-safari",
    tags: ["Classic", "Lipstick"],
    gallery: ["https://picsum.photos/800/1000?random=6", "https://picsum.photos/800/1000?random=106", "https://picsum.photos/800/1000?random=206"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: true
  },
  {
    id: 4,
    name: "SUMMER MIRAGE",
    category: "Lip Gloss",
    price: 32.0,
    image: "https://picsum.photos/800/1000?random=7",
    badge: "New",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "summer-mirage",
    tags: ["Summer", "Limited"],
    gallery: ["https://picsum.photos/800/1000?random=7", "https://picsum.photos/800/1000?random=107", "https://picsum.photos/800/1000?random=207"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: true
  },
  {
    id: 5,
    name: "SUMMER DRAMA",
    category: "Lip Gloss",
    price: 32.0,
    image: "https://picsum.photos/800/1000?random=8",
    badge: "New",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "summer-drama",
    tags: ["Drama", "Intense"],
    gallery: ["https://picsum.photos/800/1000?random=8", "https://picsum.photos/800/1000?random=108", "https://picsum.photos/800/1000?random=208"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: true
  },
  {
    id: 6,
    name: "VELVET MATTE",
    category: "Lipstick",
    price: 18.0,
    image: "https://picsum.photos/800/1000?random=9",
    badge: "Sale",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "velvet-matte",
    tags: ["Matte", "Velvet"],
    gallery: ["https://picsum.photos/800/1000?random=9", "https://picsum.photos/800/1000?random=109", "https://picsum.photos/800/1000?random=209"],
    variantType: "Shades",
    variants: [
      { name: "Nude 01", image: "https://picsum.photos/800/1000?random=9", gallery: ["https://picsum.photos/800/1000?random=9", "https://picsum.photos/800/1000?random=109"] },
      { name: "Rose 02", image: "https://picsum.photos/800/1000?random=10", gallery: ["https://picsum.photos/800/1000?random=10", "https://picsum.photos/800/1000?random=110"] }
    ],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: true
  },
  {
    id: 7,
    name: "GLOW SERUM",
    category: "Skin Care",
    price: 45.0,
    image: "https://picsum.photos/800/1000?random=11",
    badge: "New",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "glow-serum",
    tags: ["Serum", "Glow"],
    gallery: ["https://picsum.photos/800/1000?random=11", "https://picsum.photos/800/1000?random=111", "https://picsum.photos/800/1000?random=211"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: true
  },
  {
    id: 8,
    name: "SILK FOUNDATION",
    category: "Skin Care",
    price: 38.0,
    image: "https://picsum.photos/800/1000?random=12",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "silk-foundation",
    tags: ["Foundation", "Silk"],
    gallery: ["https://picsum.photos/800/1000?random=12", "https://picsum.photos/800/1000?random=112", "https://picsum.photos/800/1000?random=212"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: false
  },
  {
    id: 9,
    name: "EYELASH CURLER",
    category: "Eye Care",
    price: 12.0,
    image: "https://picsum.photos/800/1000?random=13",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "eyelash-curler",
    tags: ["Tools", "Curler"],
    gallery: ["https://picsum.photos/800/1000?random=13", "https://picsum.photos/800/1000?random=113", "https://picsum.photos/800/1000?random=213"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: true,
  },
  {
    id: 10,
    name: "BROW GEL",
    category: "Eye Care",
    price: 15.0,
    image: "https://picsum.photos/800/1000?random=14",
    badge: "New",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "brow-gel",
    tags: ["Brows", "Gel"],
    gallery: ["https://picsum.photos/800/1000?random=14", "https://picsum.photos/800/1000?random=114", "https://picsum.photos/800/1000?random=214"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: false
  },
  {
    id: 11,
    name: "PEACH BLUSH",
    category: "Cheek",
    price: 22.0,
    image: "https://picsum.photos/800/1000?random=15",
    badge: "Sale",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "peach-blush",
    tags: ["Blush", "Peach"],
    gallery: ["https://picsum.photos/800/1000?random=15", "https://picsum.photos/800/1000?random=115", "https://picsum.photos/800/1000?random=215"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: true
  },
  {
    id: 12,
    name: "MATTE BRONZER",
    category: "Cheek",
    price: 28.0,
    image: "https://picsum.photos/800/1000?random=16",
    description: "An dico accommodare ius, porro mnesarchum pro in. Cetero fierent urbanitas eam id, sed movet voluptua ut.",
    slug: "matte-bronzer",
    tags: ["Bronzer", "Matte"],
    gallery: ["https://picsum.photos/800/1000?random=16", "https://picsum.photos/800/1000?random=116", "https://picsum.photos/800/1000?random=216"],
    videos: ["vP9X2V9c3Uw"],
    purchaseLink: "#",
    featured: false
  },
];
