"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { getProducts } from "@/src/services/api";
import type { Product } from "@/src/types";

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.12 },
  }),
};

export function FeaturedProducts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  const featured = allProducts.filter(p => p.featured);
  const itemsPerPage = 4;
  const numDots = Math.ceil(featured.length / itemsPerPage);

  useEffect(() => {
    if (numDots <= 1) return;
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % numDots);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [numDots, isPaused]);

  if (allProducts.length === 0) return null;

  const currentSlice = featured.slice(activeIndex * itemsPerPage, (activeIndex + 1) * itemsPerPage);

  return (
    <section
      className="py-24 px-4 bg-[#FDF9F5]"
    onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={headerVariants}
        className="text-center mb-20 relative"
      >
        <div className="relative inline-block"   >
          <h2 className="headline mb-2 text-[52px] leading-tight relative z-10 font-medium">Beauty & Grooming</h2>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.05] pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-black stroke-1">
              <path d="M50 10 C50 10 30 40 50 60 M50 10 C50 10 70 40 50 60 M50 30 C50 30 20 50 50 70 M50 30 C50 30 80 50 50 70" />
            </svg>
          </div>
        </div>
        <p className="subheadline tracking-[3.25px] text-[14px] font-medium">Trending Cosmetics</p>
      </motion.div>

      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 gap-4"
        >
          <AnimatePresence mode="wait">
            {currentSlice.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -30, scale: 0.9, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
