"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Send } from "lucide-react";
import { getFooterData } from "@/src/services/api";
import type { FooterData } from "@/src/types";

export function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    getFooterData().then(setFooterData);
  }, []);

  if (!footerData) return null;
  return (
    <footer className="bg-[#4B4036] text-white pt-24 pb-12">
      {/* Instagram Space Section */}
      <div className="mb-24 px-8 ">
        <div className="text-center mb-16 relative">
          <div className="inline-block relative">
            <h2 className="headline text-white">Instagram Space</h2>
            {/* Decorative flourish background */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] w-46 h-46 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-white stroke-1">
                    <path d="M50 10 C50 10 30 40 50 60 M50 10 C50 10 70 40 50 60 M50 30 C50 30 20 50 50 70 M50 30 C50 30 80 50 50 70 M50 50 C50 50 10 70 50 90 M50 50 C50 50 90 70 50 90" />
                </svg>
             </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 px-8">
          {footerData.instagramImages.slice(0, 5).map((img, idx) => (
            <Link key={idx} href="https://instagram.com" target="_blank" className="relative aspect-square overflow-hidden group block">
              <Image
                src={img}
                alt={`Instagram ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram size={32} className="text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Column 1: Logo & Info (4/12) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative w-12 h-12 brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="w-full h-full   rounded-full flex items-center justify-center overflow-hidden">
                   <Image src="/images/logo.png" alt="Creamz Logo" fill className="object-contain scale-75" />
                </div>
              </div>
              <span className="text-[36px] font-cormorant font-medium tracking-tight">Cozmi Lab</span>
            </div>
            
            <p className="text-[#b2a69b] font-lato text-[17px] leading-relaxed max-w-[360px]">
              {footerData.description}
            </p>
          </div>

          {/* Column 2: Explore Links (4/12) */}
          <div className="lg:col-span-4 lg:pt-2">
            <h3 className="text-[26px] font-cormorant italic mb-10 tracking-wide">Explore</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[...footerData.exploreLinks, ...footerData.servicesLinks].map((link) => (
                <Link key={link.name} href={link.href} className="text-gray-300 font-lato text-[14px] flex items-center group transition-colors">
                  <div className="mr-3 transform transition-transform group-hover:rotate-90">
                    <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 0L6.12257 3.87743L10 5L6.12257 6.12257L5 10L3.87743 6.12257L0 5L3.87743 3.87743L5 0Z" fill="white" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    </svg>
                  </div>
                  <span className="text-[#b2a69b] hover:text-white transition-colors   lg:text-lg text-[16px]">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Newsletter (4/12) */}
          <div className="lg:col-span-4 lg:pt-2">
            <h3 className="text-[28px] font-cormorant italic mb-10 tracking-wide">Subscribe To Our Newsletter</h3>
            <div className="space-y-8">
              <div className="relative border-b border-gray-500 pb-3 group">
                <input 
                  type="email" 
                  placeholder="YOUR MAIL" 
                  className="bg-transparent w-full font-lato text-[14px] tracking-[0.35em] outline-none placeholder:text-[#b2a69b] text-white"
                />
                <button className="absolute right-0 top-0 text-gray-500 hover:text-white transition-colors">
                  <Send size={18} className="rotate-45" />
                </button>
              </div>
              
              <p className="text-[#b2a69b] font-lato text-[15px] tracking-[0.05em] ">
                We Won&apos;t spam. Unsubscribe at any time.
              </p>

              <div className="flex items-center gap-6 pt-3 border-t border-white/5">
                <span className="text-[18px]  tracking-wide text-[#b2a69b]">Social Media :</span>
                <div className="flex gap-4">
                  {[
                    { icon: <Linkedin size={18} />, href: '#' },
                    { icon: <Facebook size={18} />, href: '#' },
                    { icon: <Instagram size={18} />, href: '#' },
                  ].map((social, i) => (
                    <Link 
                      key={i} 
                      href={social.href} 
                      className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#4A3728] hover:border-white transition-all duration-500"
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-6 text-[15px] font-lato  text-white ">
          <p>© 2026 Cozmi Lab | Powered by <a href="https://www.thebigdogdigital.com/" target="_blank" className="text-white font-bold transition-colors">BigDog Digital</a>.</p>
        
        </div>
      </div>
    </footer>
  );
}
