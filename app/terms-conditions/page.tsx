"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getTermsConditions } from "@/src/services/api";
import type { TermsConditions } from "@/src/types";

export default function TermsConditionsPage() {
  const [terms, setTerms] = useState<TermsConditions | null>(null);

  useEffect(() => {
    getTermsConditions().then(setTerms);
  }, []);

  if (!terms) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow bg-white">
        {/* Breadcrumb Section */}
        <div className="bg-[#FAF6F1] pt-32 pb-16 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-[64px] font-cormorant italic text-[#4B4036] mb-6">
              {terms.title}
            </h1>
            <div className="flex items-center justify-center gap-3 text-[11px] md:text-[11px] uppercase tracking-[0.2em] text-custom font-medium font-lato">
              <span className="text-custom font-medium">Home</span>
              <span className="text-neutral-300">/</span>
              <span className="text-[#4B4036]/60">{terms.title}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 lg:px-12 py-20 ">
          <p className="text-[11px] font-lato tracking-[0.2em] text-[#4B4036]/60 uppercase mb-12">
            Last Updated: {terms.lastUpdated}
          </p>
          
          <div className="space-y-16">
            {terms.sections.map((section, idx) => (
              <section key={idx} className="space-y-6">
                <h2 className="text-3xl font-cormorant italic text-[#4B4036]">
                  {section.heading}
                </h2>
                <p className="font-lato text-custom leading-relaxed text-justify text-[16px]">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
