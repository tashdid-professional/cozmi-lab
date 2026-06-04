"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getFAQs } from "@/src/services/api";
import type { FAQ } from "@/src/types";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqItems, setFaqItems] = useState<FAQ[]>([]);

  useEffect(() => {
    getFAQs().then(setFaqItems);
  }, []);

  if (faqItems.length === 0) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow bg-white">
        {/* Breadcrumb Section */}
        <div className="bg-[#FAF6F1] pt-32 pb-16 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-[64px] font-cormorant italic text-[#4B4036] mb-6">
              Frequently Asked Questions
            </h1>
            <div className="flex items-center justify-center gap-3 text-[11px] md:text-[11px] uppercase tracking-[0.2em] text-custom font-medium font-lato">
              <span className="text-custom font-medium">Home</span>
              <span className="text-neutral-300">/</span>
              <span className="text-[#4B4036]/60">FAQ</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 lg:px-12 px-4 py-20 ">
          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <div 
                key={idx} 
                className="border-b border-neutral-100 last:border-none"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <h3 className={`text-xl md:text-2xl font-cormorant italic transition-colors ${openIndex === idx ? "text-custom" : "text-[#4B4036] group-hover:text-custom"}`}>
                    {faq.question}
                  </h3>
                  {openIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-custom" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#4B4036]/40" />
                  )}
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === idx ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="font-lato text-custom leading-relaxed text-[16px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
