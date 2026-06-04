"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getProductSpecialties } from "@/src/services/api";
import type { ProductSpecialtiesData } from "@/src/types";

const iconMap = {
  rabbit: "/images/1.svg",
  beaker: "/images/2.svg",
  ban: "/images/3.svg",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export const ProductSpecialty = () => {
  const [data, setData] = useState<ProductSpecialtiesData | null>(null);

  useEffect(() => {
    getProductSpecialties().then(setData);
  }, []);

  if (!data) return null;

  return (
    <section className="py-20 md:py-32 bg-[#EFE0D1] overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-center lg:mb-16 mb-8 relative z-10 lg:mt-0 mt-8"
          >
            <h2 className="text-4xl md:text-5xl font-cormorant italic text-[#4B4036] mb-4 font-medium">
              Our Product Specialty
            </h2>
            <p className="text-[11px] md:text-[14px] tracking-[3.25px] uppercase text-[#b2a69b] font-medium">
              {data.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-12 md:gap-24 mb-10"
          >
            {data.icons.map((specialty, idx) => {
              const iconSrc = iconMap[specialty.icon as keyof typeof iconMap] || "/images/1.svg";
              return (
                <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F3F3F3] flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Image
                      src={iconSrc}
                      alt={specialty.name}
                      width={40}
                      height={40}
                      className="opacity-70 transition-transform group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-cormorant italic text-[#4B4036]">
                    {specialty.name}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={textVariants}
          className="mx-auto text-center relative"
        >
          <p className="text-2xl italic md:text-[43px] font-cormorant text-[#4B4036] leading-[1.6]">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="mt-12 flex justify-center opacity-30"
        >
          <div className="w-24 h-px bg-[#4B4036]"></div>
        </motion.div>

        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 100C250 50 400 150 500 100C600 50 750 150 900 100" stroke="#4B4036" strokeWidth="0.5" fill="none" />
            <path d="M50 400C200 350 350 450 450 400C550 350 700 450 850 400" stroke="#4B4036" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </div>
    </section>
  );
};
