"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTestimonials } from "@/src/services/api";
import type { Testimonial } from "@/src/types";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState<Testimonial[]>([]);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getTestimonials().then(setItems);
  }, []);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  }, [activeIndex]);

  useEffect(() => {
    if (items.length === 0) return;
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % items.length;
        setDirection(1);
        return next;
      });
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items.length, isPaused]);

  if (items.length === 0) return null;

  return (
    <section
      className="bg-[#F8F6F4] py-24 px-8 overflow-hidden"
    
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 "  onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
        {/* Left: Image */}
        <div className="w-full md:w-[40%] flex justify-center items-end relative">
          <div className="relative w-full aspect-[4/5] max-w-[450px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={items[activeIndex].image}
                  alt={items[activeIndex].name}
                  fill
                  className="object-cover object-top grayscale-[0.2]"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-[60%] relative">
          <h2 className="headline mb-8 text-left font-medium">Testimonials</h2>

          <div className="relative z-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <p className="font-lato text-[14px] lg:text-[18px] text-custom leading-relaxed max-w-[550px]">
                  {items[activeIndex].content}
                </p>

                <div className="flex gap-1 py-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < items[activeIndex].rating
                          ? "fill-custom text-custom"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 lg:pt-4 font-cormorant italic text-[24px] text-custom font-bold">
                  {items[activeIndex].name}
                  <span className="subheadline text-[14px] not-italic align-middle flex items-center h-full pt-1.5 font-lato font-normal">
                    — {items[activeIndex].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 pt-10">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-custom"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="absolute lg:bottom-20 lg:right-20 right-0 -translate-y-1/2 opacity-[0.3] pointer-events-none transform scale-[4]">
            <Quote size={30} className="text-custom fill-custom" />
          </div>
        </div>
      </div>
    </section>
  );
}
