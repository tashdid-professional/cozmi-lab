// ── Product ──
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
  shortdescription?: string;
  slug: string;
  tags: string[];
  gallery: string[];
  videos: string[];
  purchaseLink?: string;
  variantType?: string;
  variants?: ProductVariant[];
  featured: boolean;
}

// ── Blog ──
export interface Blog {
  id: number;
  slug: string;
  category: string;
  author: string;
  date: string;
  title: string;
  excerpt: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

// ── Testimonial ──
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

// ── Homepage ──
export interface HeroSlide {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  thumbnails: string[];
}

export interface ShopCategoryItem {
  name: string;
  itemCount: number;
  image: string;
  slug: string;
}

export interface ProductSpecialtyItem {
  name: string;
  icon: string;
}

export interface ProductSpecialtiesData {
  icons: ProductSpecialtyItem[];
  subtitle: string;
  description: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon?: string;
}

export interface FooterData {
  description: string;
  exploreLinks: FooterLink[];
  servicesLinks: FooterLink[];
  socials: SocialLink[];
  instagramImages: string[];
}

export interface ContactData {
  address: string;
  email: string;
  phone: string;
  socials: SocialLink[];
  description: string;
}

// ── About ──
export interface AboutStats {
  rating: number;
  ratingCount: string;
  customers: string;
  customersLabel: string;
  peoplesLabel: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  stats: AboutStats;
  videoThumbnail: string;
  videoUrl: string;
  teamImages: string[];
  extraPeoples: number;
  buttonText: string;
  buttonLink: string;
}

// ── Legal / FAQ ──
export interface PolicySection {
  heading: string;
  content: string;
}

export interface PrivacyPolicy {
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface TermsConditions {
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface FAQ {
  question: string;
  answer: string;
}
