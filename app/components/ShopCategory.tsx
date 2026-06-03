"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { shopCategories } from "@/public/datas/homepage";

export const ShopCategory = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-cormorant italic text-[#4B4036] mb-4 font-medium">
            Shop Category
          </h2>
          {/* Decorative flourish background */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.05] pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-black stroke-1">
              <path d="M50 10 C50 10 30 40 50 60 M50 10 C50 10 70 40 50 60 M50 30 C50 30 20 50 50 70 M50 30 C50 30 80 50 50 70" />
            </svg>
          </div>
          <p className="text-[11px] md:text-[14px] tracking-[3.25px] uppercase text-[#b2a69b]  font-medium">
            POPULAR CATEGORIES
          </p>
          
          {/* Decorative Branch Placeholder */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none -z-10">
            <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50Q100 0 190 50" stroke="#4B4036" strokeWidth="0.5"/>
              <path d="M50 35L30 20M120 25L140 10" stroke="#4B4036" strokeWidth="0.5"/>
            </svg>
          </div>
        </div>

        {/* Categories Grid - Adjusted for 3 up / 2 down layout from image */}
        <div className="lg:flex flex-wrap justify-center gap-12 md:gap-x-56 max-w-6xl mx-auto grid grid-cols-2 ">
          {shopCategories.map((category, idx) => (
            <Link 
              key={idx} 
              href={`/shop?category=${category.slug}`}
              className="group flex flex-col items-center text-center max-w-50"
            >
              <div className="relative w-40 h-40 md:w-62 md:h-62 mb-6">
                {/* Circular Container */}
                <div className="w-full h-full rounded-full overflow-hidden relative ring-1 ring-neutral-100 group-hover:shadow-2xl transition-all duration-500">
                  <Image 
                    src={category.image} 
                    alt={category.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Decorative Element on hover could go here */}
              </div>
              
              <h3 className="text-2xl md:text-[36px] font-cormorant italic text-[#4B4036] mb-1 group-hover:text-black transition-colors">
                {category.name}
              </h3>
              <p className="text-[10px] md:text-[14px] tracking-widest text-[#b2a69b] uppercase font-lato">
                ({category.itemCount} ITEMS)
              </p>
            </Link>
          ))}
        </div>

        {/* Floating Decorative Flowers (Absolute Positioned) */}
        <div className="absolute bottom-0 left-10 w-58 h-58  pointer-events-none rotate-20 hidden md:block">
          <Image src={"/images/tree-1.webp"} width={192} height={192} alt="Decorative Tree" />
        </div>
        <div className="absolute -bottom-10 right-10 w-58 h-58  pointer-events-none -rotate-20 hidden md:block">
          <Image src={"/images/tree-2.webp"} width={192} height={192} alt="Decorative Tree" />
        </div>
      </div>
    </section>
  );
};
