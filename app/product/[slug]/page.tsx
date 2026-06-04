"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import { getProducts, getProductBySlug } from "@/src/services/api";
import type { Product, ProductVariant } from "@/src/types";


export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    getProductBySlug(slug as string).then(setProduct);
    getProducts().then(setAllProducts);
  }, [slug]);

  useEffect(() => {
    setSelectedVariant(product?.variants?.[0] || null);
  }, [product]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedVariant]);

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        
        
        <div className="container mx-auto px-4 py-40 text-center">
          <h2 className="text-2xl tracking-[0.08em] uppercase">Product Not Found</h2>
          <Link href="/shop" className="mt-8 inline-block text-sm tracking-[0.08em] uppercase border-b border-black pb-1">Back to Shop</Link>
        </div>
       
      </main>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .reduce((acc: typeof allProducts, curr) => {
      const hasCategory = acc.some(p => p.category === curr.category);
      if (acc.length < 4 && !hasCategory) acc.push(curr);
      return acc;
    }, [])
    .concat(allProducts.filter(p => p.id !== product.id))
    .filter((p, i, self) => self.findIndex(t => t.id === p.id) === i)
    .slice(0, 4);

  const activeGallery = selectedVariant ? selectedVariant.gallery : product.gallery;

  return (
    <div className="flex flex-col min-h-screen">
    
      
      <main className="grow bg-white">
        {/* Breadcrumb Section */}
        <div className="bg-[#FAF6F1] pt-32 pb-16 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-[64px] font-cormorant italic text-[#4B4036] mb-6">
              Shop
            </h1>
            <div className="flex items-center justify-center gap-3 text-[11px] md:text-[11px] uppercase tracking-[0.2em] text-custom font-medium font-lato">
              <span className="text-custom font-medium">Home</span>
              <span className="text-neutral-300">/</span>
              <Link href="/shop" className="text-[#4B4036]/60 hover:text-black transition-colors">{product.category}</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-[#4B4036]/60">{product.name}</span>
            </div>
          </div>
        </div>

      <div className="container  pb-16 md:pb-20 pt-10 lg:px-12 px-4" >

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-8">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-6 order-2 md:order-1">
              {activeGallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 transition-all p-1.5 ${
                    activeImageIndex === idx ? 'border-[#E3CBB3]' : 'border-neutral-200'
                  }`}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#fafafa]">
                    <Image 
                      src={img} 
                      alt={`${product.name} thumb ${idx}`} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 order-1 md:order-2">
              <div className="relative aspect-4/5 w-full bg-[#fafafa] overflow-hidden">
                {product.badge && (
                  <div className={`absolute top-6 left-6 px-4 py-2 z-20 rounded-xs ${
                    product.badge === "New" ? "bg-[#c24b3a]" : "bg-[#4b6c5b]"
                  }`}>
                    <span className="text-white text-[12px] md:text-[14px] font-bold tracking-widest uppercase">
                      {product.badge}
                    </span>
                  </div>
                )}
                {activeGallery[activeImageIndex] && (
                  <Image 
                    src={activeGallery[activeImageIndex]} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-opacity duration-300" 
                    priority
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 flex flex-col justify-start sticky top-24">

            <h1 className="text-2xl md:text-[34px] lg:text-[68px] font-semibold italic font-cormorant tracking-normal text-[#4b4036] mb-6 ">
              {product.name}
            </h1>
             <div className="flex items-center gap-4 mb-4 md:mb-4 ">
              {product.oldPrice && (
                <span className=" text-[#999] text-lg md:text-xl lg:text-[36px]  font-cormorant line-through"> 
                  <span className="">৳ </span>{product.oldPrice.toFixed(2)}
                </span>
              )}
              <span className=" text-[#4b4036] text-2xl md:text-xl lg:text-[36px]  font-cormorant">
                <span className="text-sm">৳ </span>{product.price.toFixed(2)}
              </span>
            </div>
              <div className="text-[18px] text-[#4b4036] mb-6">
                {product.shortdescription}
              </div>
            
           

          

            {/* Variants / Dynamic Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8 md:mb-10">
                <span className="text-[10px] md:text-[14px] tracking-[0.08em] uppercase text-black font-semibold block mb-4">
                  {product.variantType || "Choose Option"}
                </span>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 md:px-4 py-2 border text-[9px] md:text-[13px] tracking-[0.08em] uppercase transition-all ${
                        selectedVariant?.name === variant.name
                          ? "border-black text-black bg-white"
                          : "border-[#eee] text-[#999] hover:border-black hover:text-black"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase */}
            <div className="flex items-center gap-6 mb-8 md:mb-12">
              <a 
                href={product.purchaseLink || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full px-12  bg-[#4B4036] border font-medium uppercase border-[#4B4036]  h-14 flex items-center  text-white justify-center text-[12px]  tracking-[0.08em] e hover:bg-[#B2A69B]  hover:border-[#B2A69B] hover:border hover:text-white transition-all duration-500"
              >
                Buy it now
              </a>
            </div>

            {/* Meta */}
            <div className="space-y-2 pt-6 md:pt-8 border-t border-[#eee]">
              <p className="text-[10px] md:text-[14px] tracking-[0.08em] uppercase text-black font-semibold">
                Category: <span className="font-normal text-[#777] ml-2">{product.category}</span>
              </p>
              <p className="text-[10px] md:text-[14px] tracking-[0.08em] uppercase text-black font-semibold">
                Tags: <span className="font-normal text-[#777] ml-2">{product.tags.join(", ")}</span>
              </p>
            </div>
          </div>
        </div>

        

        {/* Tabs Section */}
        <div className="bg-white">
        <div className="mt-16 md:mt-24 ">
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-12">
            <button 
              onClick={() => setActiveTab("description")}
              className={`px-6 md:px-7 py-3 md:py-2.5 text-[13px] md:text-[15px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeTab === 'description' 
                ? 'border-custom text-custom' 
                : 'border-transparent text-neutral-400 hover:text-custom hover:border-neutral-200'
              }`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab("videos")}
              className={`px-6 md:px-7 py-3 md:py-2.5 text-[13px] md:text-[15px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeTab === 'videos' 
                ? 'border-custom text-custom' 
                : 'border-transparent text-neutral-400 hover:text-custom hover:border-neutral-200'
              }`}
            >
              Videos
            </button>
          </div>

          <div className="py-2 max-w-4xl mx-auto ">
            {activeTab === "description" ? (
              <div className="animate-fadeIn">
                <p className="text-custom text-base md:text-[17px] leading-[1.8] font-medium">
                  {product.description}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-fadeIn">
                {product.videos.map((vidId, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xs overflow-hidden bg-neutral-100 ring-1 ring-black/5">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube-nocookie.com/embed/${vidId}`}
                      title={`Product Video ${idx + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    ></iframe>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="headline text-center mb-10">Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
        </div>

        </div>
      </main>
     
    </div>
  );
}
