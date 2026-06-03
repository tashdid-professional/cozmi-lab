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
    <div className={`relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center ${className} rounded-full`}>
      {/* Rotating Text SVG */}
      <div className="absolute inset-0 animate-[spin_14s_linear_infinite_reverse] p-4 z-60">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="text-[12px] font-cormorant font-extrabold  fill-[#312e2b] ">
            <textPath href="#circlePath" className="">
              {text} • 
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Image */}
      <div className="absolute z-60 w-18 h-18 md:w-26 md:h-26 rounded-full overflow-hidden bg-[#E8D1BB] flex items-center justify-center">
        <Image
          src={image}
          alt="Center Decorative"
          width={80}
          height={80}
          className="object-contain p-2"
        />
      </div>
      <div>
        <Image src={"/images/rotate-bg.webp"} width={700} height={700} className="object-contain relative top-0 animate-spin   [animation-duration:14s]" alt="Icon" />
      </div>
      
      
    </div>
  );
};

export default SpinningText;
