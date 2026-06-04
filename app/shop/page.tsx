"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { getProducts } from "@/src/services/api";
import type { Product } from "@/src/types";
import ProductCard from "@/app/components/ProductCard";

const ITEMS_PER_PAGE = 12;

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (allProducts.length === 0 || !categoryParam) return;
    const foundCategory = allProducts.find(
      (p) => p.category.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase()
    )?.category;

    if (foundCategory) {
      setSelectedCategory(foundCategory);
    } else {
      const directMatch = allProducts.find(
        (p) => p.category.toLowerCase() === categoryParam.toLowerCase()
      )?.category;
      if (directMatch) {
        setSelectedCategory(directMatch);
      }
    }
  }, [categoryParam, allProducts]);

  const categories = Array.from(new Set(allProducts.map((p) => p.category)));
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: allProducts.filter((p) => p.category === cat).length,
  }));

  const filteredProducts = allProducts.filter((product) => {
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

  const revealUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const sidebarReveal = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.06 },
    }),
  };

  const emptyVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealUp}
          className="bg-[#FAF6F1] pt-32 pb-16 md:py-32 text-center"
        >
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
        </motion.div>

        <div className="container mx-auto px-4 py-8 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12">
            
            <div className="lg:hidden top-[70px] z-30 bg-white py-4 mb-6 border-b border-neutral-100 flex justify-between items-center">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 text-[12px] font-lato tracking-[0.2em] uppercase font-bold text-custom"
              >
                <Filter className="w-4 h-4" />
                Filter & Search
              </button>
              <span className="text-[11px] font-lato text-custom/60 uppercase tracking-widest">
                {filteredProducts.length} Products
              </span>
            </div>

            <div className="lg:w-[70%] order-2 lg:order-1">
              {currentProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4">
                    {currentProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-20px" }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={revealUp}
                      className="mt-16 flex justify-center items-center gap-4"
                    >
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
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={emptyVariants}
                  className="text-center py-20"
                >
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
                </motion.div>
              )}
            </div>

            <motion.aside
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={sidebarReveal}
              className={`
                fixed inset-0 z-[100] bg-white transform transition-transform duration-500 lg:static lg:block lg:w-[30%] lg:translate-x-0 lg:z-auto
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                order-1 lg:order-2
              `}
            >
              <div className="lg:hidden flex justify-between items-center p-6 border-b border-neutral-100">
                <h3 className="text-[24px] font-cormorant italic text-[#4B4036]">
                  Filters
                </h3>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2">
                  <X className="w-6 h-6 text-custom" />
                </button>
              </div>

              <div className="h-full overflow-y-auto lg:overflow-visible p-8 lg:p-0 space-y-12 pb-32 lg:pb-0">
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
                      onKeyDown={(e) => e.key === 'Enter' && setIsSidebarOpen(false)}
                      className="w-full border-b border-neutral-200 py-3 pr-10 text-[14px] font-lato tracking-[0.2em] outline-none focus:border-custom transition-colors"
                    />
                    <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B4036]/40 group-focus-within:text-custom transition-colors cursor-pointer" />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[36px] font-cormorant italic text-[#4B4036]">
                    Product categories
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setIsSidebarOpen(false);
                        }}
                        className={`text-[14px] font-lato tracking-[0.2em] uppercase transition-colors hover:text-custom w-full text-left ${
                          selectedCategory === null ? "text-custom " : "text-[#4B4036]/60"
                        }`}
                      >
                        All products ({allProducts.length})
                      </button>
                    </li>
                    {categoryCounts.map((cat) => (
                      <li key={cat.name}>
                        <button
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setIsSidebarOpen(false);
                          }}
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
              </div>
            </motion.aside>

            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/20 z-[90] lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
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
