"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/public/datas/products";

export function FeaturedProducts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = products.filter(p => p.featured);
  const itemsPerPage = 4;
  const numDots = Math.ceil(featured.length / itemsPerPage);

 
  const visibleProducts = featured;

  return (
    <section className="py-24 px-4 bg-[#FDF9F5]">
      {/* Section Header */}
      <div className="text-center mb-20 relative">
        <div className="relative inline-block">
          <h2 className="headline mb-2 text-[52px] leading-tight relative z-10">Beauty & Grooming</h2>
          {/* Decorative flourish background */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.05] pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-black stroke-1">
              <path d="M50 10 C50 10 30 40 50 60 M50 10 C50 10 70 40 50 60 M50 30 C50 30 20 50 50 70 M50 30 C50 30 80 50 50 70" />
            </svg>
          </div>
        </div>
        <p className="subheadline tracking-[0.3em] text-[13px]">Trending Cosmetics</p>
      </div>

      {/* Products Grid / Slider Container */}
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 gap-4">
          {visibleProducts.slice(activeIndex * itemsPerPage, (activeIndex + 1) * itemsPerPage).map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {numDots > 1 && (
          <div className="flex justify-center gap-4 pt-16">
            {[...Array(numDots)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "bg-[#4B4036]" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
