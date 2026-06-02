"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { contactData } from "@/public/datas/homepage";

export default function ContactPage() {
  const iconMap: { [key: string]: any } = {
    Linkedin: Linkedin,
    Facebook: Facebook,
    Instagram: Instagram,
  };

  return (
    <div className="flex flex-col min-h-screen">
     
      
      <main className="grow bg-white">
        {/* Breadcrumb Section */}
        <div className="bg-[#FAF6F1] pt-32 pb-16 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-[64px] font-cormorant italic text-[#4B4036] mb-6">
              Contact Us
            </h1>
            <div className="flex items-center justify-center gap-3 text-[11px] md:text-[11px]  tracking-[0.2em] text-custom font-medium font-lato">
              <span className="text-custom font-medium uppercase">Home</span>
              <span className="text-neutral-300">/</span>
              <Link href="/contact" className="text-[#4B4036]/60 hover:text-black transition-colors uppercase">Contact Us</Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Info */}
            <div>
              <div className="relative mb-8 md:mb-10">
                <h2 className="text-4xl md:text-[48px] font-cormorant italic text-[#4B4036] relative z-10">
                  Contact Us
                </h2>
                {/* Decorative Element Placeholder (like the leaf in the image) */}
                <div className="absolute -top-6 -left-4 opacity-10 pointer-events-none">
                  {/* You can replace this with an SVG or Image if you have the leaf asset */}
                  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10C50 10 30 40 30 60C30 80 50 90 50 90C50 90 70 80 70 60C70 40 50 10Z" stroke="#4B4036" strokeWidth="1"/>
                  </svg>
                </div>
              </div>

              <p className="text-[#] text-base md:text-[18px] leading-[1.8] mb-12 max-w-lg">
                {contactData.description}
              </p>

              <div className="space-y-6 text-[#4B4036]">
                <p className="text-sm md:text-base">
                  <span className="font-bold   text-[18px] mr-2">Address:</span>
                  <span className="text-[#4b4036]">{contactData.address}</span>
                </p>
                <div className="flex flex-wrap gap-x-12 gap-y-4">
                  <p className="text-sm md:text-base">
                    <span className="font-bold   text-[18px] mr-2">Mail:</span>
                    <a href={`mailto:${contactData.email}`} className="text-[#] hover:text-black transition-colors">{contactData.email}</a>
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-bold   text-[18px] mr-2">Phone:</span>
                    <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className="text-[#] hover:text-black transition-colors">{contactData.phone}</a>
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <p className="font-bold   text-[18px] text-[#4B4036] mb-6">Social Media :</p>
                <div className="flex gap-4">
                  {contactData.socials.map((social, idx) => {
                    const Icon = iconMap[social.icon];
                    return (
                      <a 
                        key={idx}
                        href={social.href} 
                        className="w-10 h-10 rounded-full bg-[#4B4036] flex items-center justify-center text-white hover:bg-black transition-all"
                      >
                        {Icon && <Icon size={18} {...(social.icon !== 'Instagram' ? { fill: "currentColor" } : {})} />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div>
              <form className="space-y-10">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="YOUR NAME" 
                    className="w-full py-4 bg-transparent border-b border-neutral-200 outline-none focus:border-[#4B4036] transition-all text-[14px] tracking-[0.2em] placeholder:text-neutral-400 "
                  />
                </div>
                
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL" 
                    className="w-full py-4 bg-transparent border-b border-neutral-200 outline-none focus:border-[#4B4036] transition-all text-[14px] tracking-[0.2em] placeholder:text-neutral-400 "
                  />
                </div>

                <div className="relative group">
                  <input 
                    type="tel" 
                    placeholder="CONTACT NUMBER" 
                    className="w-full py-4 bg-transparent border-b border-neutral-200 outline-none focus:border-[#4B4036] transition-all text-[14px] tracking-[0.2em] placeholder:text-neutral-400 "
                  />
                </div>

                <div className="relative group">
                  <textarea 
                    placeholder="COMMENTS" 
                    rows={4}
                    className="w-full py-4 bg-transparent border-b border-neutral-200 outline-none focus:border-[#4B4036] transition-all text-[14px] tracking-[0.2em] placeholder:text-neutral-400  resize-none"
                  ></textarea>
                </div>

             

                <button 
                  type="submit" 
                  className="px-10 py-3 bg-[#4B4036] text-white text-[11px] tracking-[0.2em]  font-medium hover:bg-black transition-all duration-300 uppercase"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
