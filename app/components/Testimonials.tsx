"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/public/datas/testimonials";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#F8F6F4] py-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6">
        {/* Left: Image */}
        <div className="w-full md:w-[40%] flex justify-center items-end relative">
          <div className="relative w-full aspect-[4/5] max-w-[450px]">
            <Image
              src={testimonials[activeIndex].image}
              alt={testimonials[activeIndex].name}
              fill
              className="object-cover object-top grayscale-[0.2] transition-all duration-700"
              priority
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-[60%] relative">
          {/* Section Heading */}
          <h2 className="headline mb-8 text-left font-medium">Testimonials</h2>

          {/* Testimonial Content */}
          <div className="lg:space-y-6 space-y-2 relative z-10">
            <p className="font-lato text-[14px] lg:text-[18px] text-custom leading-relaxed max-w-[550px]">
              {testimonials[activeIndex].content}
            </p>

            {/* Rating */}
            <div className="flex gap-1 py-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < testimonials[activeIndex].rating
                      ? "fill-custom text-custom"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 lg:pt-4 font-cormorant italic text-[24px] text-custom font-bold">
                {testimonials[activeIndex].name} 
                <span className="subheadline text-[14px] not-italic align-middle flex items-center h-full pt-1.5  font-lato font-normal">— {testimonials[activeIndex].role}</span>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-4 pt-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "bg-custom" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Decorative Quote Icon */}
          <div className="absolute lg:bottom-20 lg:right-20 right-0 -translate-y-1/2 opacity-[0.3] pointer-events-none transform scale-[4]">
             <Quote size={30} className="text-custom fill-custom" />
          </div>
        </div>
      </div>
    </section>
  );
}
