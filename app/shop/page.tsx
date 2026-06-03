"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/public/datas/products";
import ProductCard from "@/app/components/ProductCard";

const ITEMS_PER_PAGE = 12;

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (categoryParam) {
      // Find the actual category name that matches the slug
      // Products have category as "Lip Gloss", slug might be "lip-gloss"
      const foundCategory = products.find(
        (p) => p.category.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase()
      )?.category;
      
      if (foundCategory) {
        setSelectedCategory(foundCategory);
      } else {
        // Fallback: check if categoryParam directly matches any category name (case insensitive)
        const directMatch = products.find(
          (p) => p.category.toLowerCase() === categoryParam.toLowerCase()
        )?.category;
        if (directMatch) {
          setSelectedCategory(directMatch);
        }
      }
    }
  }, [categoryParam]);

  // Derived data
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: products.filter((p) => p.category === cat).length,
  }));

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow bg-white">
        {/* Breadcrumb Section */}
        <div className="bg-[#FAF6F1] pt-32 pb-16 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-[64px] font-cormorant italic text-[#4B4036] mb-6">
              Shop
            </h1>
            <div className="flex items-center justify-center gap-3 text-[11px] md:text-[11px] uppercase tracking-[0.2em] text-custom font-medium font-lato">
              <span className="text-custom font-medium">Home</span>
              <span className="text-neutral-300">/</span>
              <Link href="/shop" className="text-[#4B4036]/60 hover:text-black transition-colors">Shop</Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Products Grid */}
            <div className="lg:w-[70%]">
              {currentProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-16 flex justify-center items-center gap-4">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`min-w-10 h-10 px-2 flex items-center justify-center text-[12px] font-lato tracking-widest transition-all duration-300 ${
                            currentPage === page
                              ? "bg-custom text-white"
                              : "text-[#4B4036] hover:text-custom"
                          }`}
                        >
                          {page.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-[#4B4036]/60 font-lato text-lg">
                    No products found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="mt-4 text-custom underline underline-offset-4 hover:text-black"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-[30%] space-y-12">
              {/* Search Widget */}
              <div className="space-y-6">
                <h3 className="text-[36px] font-cormorant italic text-[#4B4036]">
                  Search
                </h3>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="SEARCH PRODUCTS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-b border-neutral-200 py-3 pr-10 text-[14px] font-lato tracking-[0.2em] outline-none focus:border-custom transition-colors"
                  />
                  <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B4036]/40 group-focus-within:text-custom transition-colors cursor-pointer" />
                </div>
              </div>

              {/* Categories Widget */}
              <div className="space-y-6">
                <h3 className="text-[36px] font-cormorant italic text-[#4B4036]">
                  Product categories
                </h3>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`text-[14px] font-lato tracking-[0.2em] uppercase transition-colors hover:text-custom w-full text-left ${
                        selectedCategory === null ? "text-custom font-bold" : "text-[#4B4036]/60"
                      }`}
                    >
                      All products ({products.length})
                    </button>
                  </li>
                  {categoryCounts.map((cat) => (
                    <li key={cat.name}>
                      <button
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`text-[14px] font-lato tracking-[0.2em] uppercase transition-colors hover:text-custom w-full text-left ${
                          selectedCategory === cat.name ? "text-custom font-bold" : "text-[#4B4036]/60"
                        }`}
                      >
                        {cat.name} ({cat.count})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional: Filter by Colors/Tags could go here */}
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
