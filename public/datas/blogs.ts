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

export const blogs: Blog[] = [
  {
    id: 1,
    slug: "tips-procedure-to-apply-luxury-beauty-cosmetic-cream",
    category: "MAKE UP",
    author: "Habibur Rahman",
    date: "FEB 20, 2025",
    title: "Tips & Procedure To Apply Luxury Beauty Cosmetic Cream",
    excerpt: "Complexion-perfecting natural foundation enriched with antioxidant-packed superfruits, vitamins, and other skin-nourishing nutrients...",
    description: "Complexion-perfecting natural foundation enriched with antioxidant-packed superfruits, vitamins, and other skin-nourishing nutrients. Creamy liquid formula sets with a pristine matte finish for soft, velvety smooth skin. Made with purifying pomegranate, collagen-boosting red wine resveratrol and lip-softening pomegranate oil. Anti-aging antioxidants also help to clarify, soothe and protect skin from oxidative damage.",
    image: "https://picsum.photos/seed/blog1/800/500",
  },
  {
    id: 2,
    slug: "the-best-way-to-select-good-high-end-cosmetic-products",
    category: "MAKE UP",
    author: "Hiếu Bùi",
    date: "FEB 20, 2025",
    title: "The Best Way To Select Good High-End Cosmetic Products",
    excerpt: "Choosing the right cosmetics for your skin type is essential for achieving a flawless look...",
    description: "Selecting high-end cosmetic products requires understanding your skin's unique needs. Look for concentrated active ingredients and avoid harsh chemicals. The quality of your products directly impacts the longevity of your makeup and the health of your skin.",
    image: "https://picsum.photos/seed/blog2/800/500",
  },
  {
    id: 3,
    slug: "lightweight-makeup-to-enhance-your-natural-beauty",
    category: "COSMETICS",
    author: "Hiếu Bùi",
    date: "FEB 20, 2025",
    title: "Lightweight Makeup To Enhance Your Natural Beauty",
    excerpt: "Minimalist beauty is all about enhancing what you already have rather than masking it...",
    description: "Lightweight makeup allows your skin to breathe while providing just enough coverage to even out your skin tone. This approach is perfect for daily wear and emphasizes your natural features without the weight of traditional heavy foundations.",
    image: "https://picsum.photos/seed/blog3/800/500",
  },
  {
    id: 4,
    slug: "herbal-ingredients-and-their-role-in-beauty-creams",
    category: "MAKE UP",
    author: "Hiếu Bùi",
    date: "FEB 20, 2025",
    title: "Herbal Ingredients And Their Role In Beauty Creams",
    excerpt: "The power of nature in skincare cannot be understated, with herbal extracts leading the way...",
    description: "Herbal ingredients like aloe vera, chamomile, and green tea have been used for centuries to heal and protect the skin. Modern beauty creams are rediscovering these ancient remedies and incorporating them into high-tech formulas for maximum benefit.",
    image: "https://picsum.photos/seed/blog4/800/500",
  },
  {
    id: 5,
    slug: "all-essential-nutrients-your-skin-requires-at-night",
    category: "COSMETICS",
    author: "Hiếu Bùi",
    date: "FEB 20, 2025",
    title: "All Essential Nutrients Your Skin Requires At Night",
    excerpt: "Nighttime is when your skin goes into repair mode, making it the perfect time for nutrition...",
    description: "During sleep, the skin's cell regeneration process is at its peak. Using nutrient-rich creams can significantly enhance this process, providing your skin with the vitamins and minerals it needs to wake up looking refreshed and revitalized.",
    image: "https://picsum.photos/seed/blog5/800/500",
  },
  {
    id: 6,
    slug: "how-to-find-the-best-brow-shape-for-your-face",
    category: "MAKE UP",
    author: "Hiếu Bùi",
    date: "FEB 20, 2025",
    title: "How To Find The Best Brow Shape For Your Face",
    excerpt: "Your eyebrows frame your face and can change your entire expression with just a few tweaks...",
    description: "Finding the right brow shape depends on your face's geometry. Oval, heart, and square faces all require different approaches to balance their proportions. This guide will walk you through the steps to identifying your ideal brow shape and how to maintain it.",
    image: "https://picsum.photos/seed/blog6/800/500",
  },
  {
    id: 7,
    slug: "additional-blog-post-1",
    category: "TIPS",
    author: "Hiếu Bùi",
    date: "FEB 20, 2025",
    title: "Additional Blog Post For Pagination Test 1",
    excerpt: "This is an additional blog post to test the pagination functionality...",
    description: "This is a descriptive text for the additional blog post to test the pagination functionality. It provides content that can be displayed on the blog details page.",
    image: "https://picsum.photos/seed/blog7/800/500",
  },
  {
    id: 8,
    slug: "additional-blog-post-2",
    category: "TIPS",
    author: "Hiếu Bùi",
    date: "FEB 20, 2025",
    title: "Additional Blog Post For Pagination Test 2",
    excerpt: "This is an additional blog post to test the pagination functionality...",
    description: "This is a descriptive text for the additional blog post to test the pagination functionality. It provides content that can be displayed on the blog details page.",
    image: "https://picsum.photos/seed/blog8/800/500",
  }
];

