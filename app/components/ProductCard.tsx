"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/public/datas/products";
import { createPortal } from "react-dom";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Fixed state management
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const closeQuickView = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsQuickViewOpen(false);
  };

  return (
    <>
      <div className="flex flex-col h-full group">
        <Link href={`/product/${product.slug}`} className="flex flex-col h-full">
          {/* Image Container */}
          <div className="relative aspect-[4/5] bg-white flex items-center justify-center  overflow-hidden group/image">
            {/* Animated Border Overlay */}
            <div className="absolute inset-0 border border-black opacity-0 group-hover/image:opacity-100 transition-all duration-500 ease-out z-30 pointer-events-none scale-105 group-hover/image:scale-100" />
            
            {product.badge && (
              <div className="absolute top-0 right-0 px-2 z-10 bg-[#4B4036] flex py-1 m-2">
                <span className="text-white text-[10px] font-lato font-bold tracking-[0.2em] uppercase">
                  {product.badge}
                </span>
              </div>
            )}
            
            {/* Product Images (Slide Transition) */}
            <div className="relative w-full h-full p-8">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover/image:-translate-x-full "
              />
              {product.gallery && product.gallery.length > 1 && (
                <Image
                  src={product.gallery[1]}
                  alt={`${product.name} alternate`}
                  fill
                  className="object-cover  transition-transform duration-700 ease-in-out translate-x-full group-hover/image:translate-x-0"
                />
              )}
            </div>

            {/* Quick View Button on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
              <button
                onClick={openQuickView}
                className="bg-[#4B4036] text-white px-10 py-3.5 text-[11px] font-lato font-bold tracking-[0.25em] uppercase shadow-xl hover:bg-black transition-all duration-300 pointer-events-auto"
              >
                Quick View
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow text-center space-y-3 bg-white py-6">
            <h3 className="font-cormorant italic lg:text-[24px] text-[18px]  text-[#4B4036] leading-tight font-medium hover:text-[#b2a69b] transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-center gap-3 font-lato lg:text-[14px] text-[12px] mt-auto font-semibold">
              {product.oldPrice && (
                <span className="text-[#b2a69b] line-through decoration-1">৳ {product.oldPrice.toFixed(2)}</span>
              )}
              <span className="text-[#4B4036] font-bold">৳ {product.price.toFixed(2)}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && isMounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm shadow-none" 
            onClick={() => closeQuickView()}
          />
          <div className="relative bg-white w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl rounded-sm">
            <button 
              onClick={(e) => closeQuickView(e)}
              className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-black hover:rotate-90 transition-all duration-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Left: Product Image */}
            <div className="w-full md:w-1/2 aspect-square relative bg-[#f7f7f7] shrink-0 p-12">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            </div>

            {/* Right: Product Info */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <span className="subheadline text-[11px] mb-2 block text-gray-400">
                  {product.category}
                </span>
                <h2 className="headline text-3xl text-[#4B4036] mb-4">
                  {product.name}
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  {product.oldPrice && (
                    <span className="text-xl text-[#b2a69b] line-through font-lato">
                      ৳ {product.oldPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl text-[#4B4036] font-bold font-lato">
                    ৳ {product.price.toFixed(2)}
                  </span>
                </div>
                <div className="w-12 h-px bg-[#4B4036] mb-8" />
                <p className="text-gray-600 text-sm leading-relaxed font-lato italic mb-8">
                  {product.description || `Experience the luxury of our curated ${product.category.toLowerCase()} collection.`}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Link 
                  href={`/product/${product.slug}`}
                  className="w-full bg-[#4B4036] text-white text-center py-4 text-[12px] uppercase tracking-[0.2em] font-lato font-bold hover:bg-black transition-all"
                >
                  View Full Details
                </Link>
                {product.purchaseLink && (
                  <a 
                    href={product.purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-gray-200 text-[#4B4036] text-center py-4 text-[12px] uppercase tracking-[0.2em] font-lato font-bold hover:border-[#4B4036] transition-all"
                  >
                    Purchase Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

