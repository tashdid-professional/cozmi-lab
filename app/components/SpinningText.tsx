"use client";

import React from "react";
import Image from "next/image";

interface SpinningTextProps {
  text: string;
  image: string;
  className?: string;
}

const SpinningText: React.FC<SpinningTextProps> = ({ text, image, className }) => {
  return (
    <div className={`relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center ${className}`}>
      {/* Rotating Text SVG */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="text-[8px] font-lato tracking-[0.2em] uppercase fill-[#4B4036]">
            <textPath href="#circlePath">
              {text} • {text} •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Image */}
      <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-[#F2D1B3]/50 flex items-center justify-center">
        <Image
          src={image}
          alt="Center Decorative"
          width={80}
          height={80}
          className="object-contain p-2"
        />
      </div>
      
      {/* Small Star/Diamond - matching the image */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
         <div className="w-3 h-3 md:w-4 md:h-4 bg-[#4B4036] rotate-45 transform origin-center"></div>
      </div>
    </div>
  );
};

export default SpinningText;
