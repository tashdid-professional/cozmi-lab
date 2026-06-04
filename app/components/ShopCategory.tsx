"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getShopCategories } from "@/src/services/api";
import type { ShopCategoryItem } from "@/src/types";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export const ShopCategory = () => {
  const [categories, setCategories] = useState<ShopCategoryItem[]>([]);

  useEffect(() => {
    getShopCategories().then(setCategories);
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-cormorant italic text-[#4B4036] mb-4 font-medium">
            Shop Category
          </h2>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.05] pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-black stroke-1">
              <path d="M50 10 C50 10 30 40 50 60 M50 10 C50 10 70 40 50 60 M50 30 C50 30 20 50 50 70 M50 30 C50 30 80 50 50 70" />
            </svg>
          </div>
          <p className="text-[11px] md:text-[14px] tracking-[3.25px] uppercase text-[#b2a69b] font-medium">
            POPULAR CATEGORIES
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none -z-10">
            <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50Q100 0 190 50" stroke="#4B4036" strokeWidth="0.5"/>
              <path d="M50 35L30 20M120 25L140 10" stroke="#4B4036" strokeWidth="0.5"/>
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="lg:flex flex-wrap justify-center gap-12 md:gap-x-56 max-w-6xl mx-auto grid grid-cols-2"
        >
          {categories.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="group flex flex-col items-center text-center max-w-50"
              >
                <div className="relative w-40 h-40 md:w-62 md:h-62 mb-6">
                  <div className="w-full h-full rounded-full overflow-hidden relative ring-1 ring-neutral-100 group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-2xl md:text-[36px] font-cormorant italic text-[#4B4036] mb-1 group-hover:text-black transition-colors">
                  {category.name}
                </h3>
                <p className="text-[10px] md:text-[14px] tracking-widest text-[#b2a69b] uppercase font-lato">
                  ({category.itemCount} ITEMS)
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -60, rotate: -10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="absolute bottom-0 left-10 w-58 h-58 pointer-events-none rotate-20 hidden md:block"
        >
          <Image src={"/images/tree-1.webp"} width={192} height={192} alt="Decorative Tree" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 10 }}
          whileInView={{ opacity: 1, x: 0, rotate: -20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
          className="absolute -bottom-10 right-10 w-58 h-58 pointer-events-none -rotate-20 hidden md:block"
        >
          <Image src={"/images/tree-2.webp"} width={192} height={192} alt="Decorative Tree" />
        </motion.div>
      </div>
    </section>
  );
};
