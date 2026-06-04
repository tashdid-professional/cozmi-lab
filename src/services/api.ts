import type {
  Product,
  Blog,
  Testimonial,
  HeroSlide,
  ShopCategoryItem,
  ProductSpecialtiesData,
  FooterData,
  ContactData,
  AboutData,
  PrivacyPolicy,
  TermsConditions,
  FAQ,
} from "@/src/types";

// ---------------------------------------------------------------------------
// Mock data imports (replace with real API calls when backend is ready)
// ---------------------------------------------------------------------------
import { products as mockProducts } from "@/public/datas/products";
import { blogs as mockBlogs } from "@/public/datas/blogs";
import { testimonials as mockTestimonials } from "@/public/datas/testimonials";
import { heroSlides as mockHeroSlides } from "@/public/datas/homepage";
import { shopCategories as mockShopCategories } from "@/public/datas/homepage";
import { productSpecialties as mockProductSpecialties } from "@/public/datas/homepage";
import { footerData as mockFooterData } from "@/public/datas/homepage";
import { contactData as mockContactData } from "@/public/datas/homepage";
import { aboutData as mockAboutData } from "@/public/datas/about";
import { privacyPolicy as mockPrivacyPolicy } from "@/public/datas/legal";
import { termsConditions as mockTermsConditions } from "@/public/datas/legal";
import { faqs as mockFAQs } from "@/public/datas/legal";

// ---------------------------------------------------------------------------
// Helper: base URL for future API calls
// ---------------------------------------------------------------------------
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
export async function getProducts(): Promise<Product[]> {
  // --- WHEN BACKEND IS READY, REPLACE WITH:
  // const res = await fetch(`${API_BASE}/products`);
  // if (!res.ok) throw new Error("Failed to fetch products");
  // return res.json();
  return mockProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // const res = await fetch(`${API_BASE}/products/${slug}`);
  // if (!res.ok) throw new Error("Failed to fetch product");
  // return res.json();
  return mockProducts.find((p) => p.slug === slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // const res = await fetch(`${API_BASE}/products?featured=true`);
  // if (!res.ok) throw new Error("Failed to fetch featured products");
  // return res.json();
  return mockProducts.filter((p) => p.featured);
}

// ---------------------------------------------------------------------------
// Blogs
// ---------------------------------------------------------------------------
export async function getBlogs(): Promise<Blog[]> {
  // const res = await fetch(`${API_BASE}/blogs`);
  // if (!res.ok) throw new Error("Failed to fetch blogs");
  // return res.json();
  return mockBlogs;
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  // const res = await fetch(`${API_BASE}/blogs/${slug}`);
  // if (!res.ok) throw new Error("Failed to fetch blog");
  // return res.json();
  return mockBlogs.find((b) => b.slug === slug);
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
export async function getTestimonials(): Promise<Testimonial[]> {
  // const res = await fetch(`${API_BASE}/testimonials`);
  // if (!res.ok) throw new Error("Failed to fetch testimonials");
  // return res.json();
  return mockTestimonials;
}

// ---------------------------------------------------------------------------
// Homepage sections
// ---------------------------------------------------------------------------
export async function getHeroSlides(): Promise<HeroSlide[]> {
  // const res = await fetch(`${API_BASE}/hero-slides`);
  // if (!res.ok) throw new Error("Failed to fetch hero slides");
  // return res.json();
  return mockHeroSlides;
}

export async function getShopCategories(): Promise<ShopCategoryItem[]> {
  // const res = await fetch(`${API_BASE}/shop-categories`);
  // if (!res.ok) throw new Error("Failed to fetch shop categories");
  // return res.json();
  return mockShopCategories;
}

export async function getProductSpecialties(): Promise<ProductSpecialtiesData> {
  // const res = await fetch(`${API_BASE}/product-specialties`);
  // if (!res.ok) throw new Error("Failed to fetch product specialties");
  // return res.json();
  return mockProductSpecialties;
}

export async function getFooterData(): Promise<FooterData> {
  // const res = await fetch(`${API_BASE}/footer`);
  // if (!res.ok) throw new Error("Failed to fetch footer data");
  // return res.json();
  return mockFooterData;
}

export async function getContactData(): Promise<ContactData> {
  // const res = await fetch(`${API_BASE}/contact`);
  // if (!res.ok) throw new Error("Failed to fetch contact data");
  // return res.json();
  return mockContactData;
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
export async function getAboutData(): Promise<AboutData> {
  // const res = await fetch(`${API_BASE}/about`);
  // if (!res.ok) throw new Error("Failed to fetch about data");
  // return res.json();
  return mockAboutData;
}

// ---------------------------------------------------------------------------
// Legal / Static pages
// ---------------------------------------------------------------------------
export async function getPrivacyPolicy(): Promise<PrivacyPolicy> {
  // const res = await fetch(`${API_BASE}/privacy-policy`);
  // if (!res.ok) throw new Error("Failed to fetch privacy policy");
  // return res.json();
  return mockPrivacyPolicy;
}

export async function getTermsConditions(): Promise<TermsConditions> {
  // const res = await fetch(`${API_BASE}/terms-conditions`);
  // if (!res.ok) throw new Error("Failed to fetch terms & conditions");
  // return res.json();
  return mockTermsConditions;
}

export async function getFAQs(): Promise<FAQ[]> {
  // const res = await fetch(`${API_BASE}/faqs`);
  // if (!res.ok) throw new Error("Failed to fetch FAQs");
  // return res.json();
  return mockFAQs;
}
