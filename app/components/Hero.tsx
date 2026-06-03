"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { heroSlides } from "@/public/datas/homepage";
import SpinningText from "./SpinningText";

export const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="bg-[#F3F3F3] relative min-h-[820px] lg:h-[90vh] flex items-end lg:pt-26 pt-10 lg:pb-0 pb-20 md:pb-36 lg:overflow-visible">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative flex items-end h-full">
              <div className="container mx-auto px-6 pt-12 md:pt-24 pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                  
                  {/* Left Side: Image with Arch and Tree */}
                  <div className={`relative flex justify-center lg:justify-end order-2 lg:order-1 transition-all duration-1000 ${selectedIndex === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                    <div className="relative w-[280px] h-[400px] sm:w-[350px] sm:h-[500px] md:w-[450px] md:h-[650px] lg:w-[500px] lg:h-[700px]">
                      {/* Arch Background */}
                      <div className="absolute bottom-0 left-0 w-full h-[85%] bg-[#E8D1BB] rounded-t-full z-0 " />
                      
                      {/* Girl Image */}
                      <div className="absolute inset-0 z-10 overflow-hidden flex items-end">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          width={600}
                          height={900}
                          className="object-contain object-bottom w-full h-full scale-105"
                          priority={index === 0}
                        />
                      </div>

                      {/* Fixed Tree Overlay */}
                      <div className={`absolute bottom-0 lg:-left-36 -left-16 md:-left-26 w-[180px] h-[200px] sm:w-[250px] sm:h-[350px] md:w-[380px] md:h-[450px] z-20 pointer-events-none overflow-visible transition-all duration-[1000ms] delay-500 ${selectedIndex === index ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-90 blur-sm"}`}>
                        <Image
                          src="/images/tree-1.webp"
                          alt="Decorative tree branch"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="space-y-6 md:space-y-6 max-w-xl order-2 text-center lg:text-left md:mx-auto lg:mx-0">
                    <div className={`space-y-2 transition-all duration-700 delay-300 ${selectedIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                      <h1 className="font-cormorant text-[48px] sm:text-[60px] md:text-[60px] lg:text-[74px] leading-[1.1] text-[#4B4036] normal-case font-medium">
                        {slide.title}
                      </h1>
                    </div>
                    
                    <p className={`font-lato text-[#4B4036] text-[16px] md:text-[18px] leading-relaxed max-w-lg mx-auto lg:mx-0 transition-all duration-700 delay-500 font-semibold${selectedIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                      {slide.description}
                    </p>

                    {/* Thumbnails row */}
                    <div className={`hidden md:flex justify-center lg:justify-start gap-4 md:gap-6 pt-8 transition-all duration-700 delay-700 ${selectedIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                      {slide.thumbnails.map((thumb, i) => (
                        <div key={i} className="relative w-24 h-16 md:w-46 md:h-20 group cursor-pointer overflow-hidden rounded-r-[40px]  ">
                          <Image
                            src={thumb}
                            alt={`Thumbnail ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>

                    <div className={`pt-4 md:pt-8 transition-all duration-700 delay-1000 ${selectedIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                      <Link 
                        href={slide.buttonLink}
                        className="inline-block bg-[#4B3C31] text-white px-10 md:px-14 py-4 md:py-4 text-[12px]  font-bold tracking-[0.2em] uppercase hover:bg-black transition-all duration-300"
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              selectedIndex === index ? "bg-[#4B4036]" : "bg-[#4B4036]/20"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Spinning Sticker */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-990 pointer-events-none">
        <SpinningText 
          text="Nurturing Beauty. Enhancing Natural Wellness."
          image="/images/tree-1.webp" 
        />
      </div>
    </section>
  );
};
