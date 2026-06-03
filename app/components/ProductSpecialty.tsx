"use client";

import React from "react";
import { productSpecialties } from "@/public/datas/homepage";
import { Beaker, Rabbit, Ban } from "lucide-react";

const iconMap = {
  rabbit: Rabbit,
  beaker: Beaker,
  ban: Ban,
};

export const ProductSpecialty = () => {
  return (
    <section className="py-20 md:py-32 bg-[#EFE0D1] overflow-hidden ">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-cormorant italic text-[#4B4036] mb-4">
            Our Product Specialty
          </h2>
          <p className="text-[11px] md:text-[13px] tracking-[0.3em] uppercase text-[#4B4036]/60 font-lato">
            {productSpecialties.subtitle}
          </p>
        </div>

        {/* Icons Grid */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-24">
          {productSpecialties.icons.map((specialty, idx) => {
            const IconComponent = iconMap[specialty.icon as keyof typeof iconMap] || Beaker;
            return (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <IconComponent className="text-[#4B4036]/70 w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110" strokeWidth={1} />
                </div>
                <h3 className="text-xl md:text-2xl font-cormorant italic text-[#4B4036]">
                  {specialty.name}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Text Area */}
        <div className=" mx-auto text-center relative ">
          <p className="text-2xl italic md:text-[43px] font-cormorant text-[#4B4036] leading-[1.6]">
            {productSpecialties.description}
          </p>
        </div>

        {/* Simple Decorative Signature/Line placeholder since we're removing red marks */}
        <div className="mt-12 flex justify-center opacity-30">
          <div className="w-24 h-px bg-[#4B4036]"></div>
        </div>

        {/* Decorative background elements */}
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
