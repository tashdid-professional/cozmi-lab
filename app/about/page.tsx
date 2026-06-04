"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAboutData } from "@/src/services/api";
import type { AboutData } from "@/src/types";
import { Star, Play } from "lucide-react";

export default function AboutPage() {
  const [showVideo, setShowVideo] = useState(false);
  const [aboutInfo, setAboutInfo] = useState<AboutData | null>(null);

  useEffect(() => {
    getAboutData().then(setAboutInfo);
  }, []);

  if (!aboutInfo) return null;

  const revealUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const contentReveal = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const imageReveal = {
    hidden: { opacity: 0, x: 60, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 },
    }),
  };

  const containerStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealUp}
          className="bg-[#FAF6F1] pt-32 pb-16 md:py-32 text-center"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-[64px] font-cormorant italic text-[#4B4036] mb-6">
              About Us
            </h1>
            <div className="flex items-center justify-center gap-3 text-[11px] md:text-[11px] uppercase tracking-[0.2em] text-custom font-medium font-lato">
              <span className="text-custom font-medium">Home</span>
              <span className="text-neutral-300">/</span>
              <Link href="/about" className="text-[#4B4036]/60 hover:text-black transition-colors">About Us</Link>
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 lg:px-12 py-16 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={contentReveal}
              className="order-2 lg:order-1"
            >
              <motion.div
                variants={containerStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={revealUp} className="relative mb-6">
                  <h2 className="text-4xl md:text-[48px] leading-[1.1] font-cormorant italic text-[#4B4036] mb-8 max-w-md font-medium">
                    {aboutInfo.title}
                  </h2>
                  <span className="text-[11px] md:text-[14px] tracking-[3.25px] uppercase text-[#4B4036]/60 font-lato block mb-4 font-medium">
                    {aboutInfo.subtitle}
                  </span>
                  <div className="absolute -top-10 -left-6 opacity-10 pointer-events-none -rotate-12">
                    <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 10C50 10 30 40 30 60C30 80 50 90 50 90C50 90 70 80 70 60C70 40 50 10Z" stroke="#4B4036" strokeWidth="0.5"/>
                      <path d="M50 10V90M50 30L35 45M50 45L65 30M50 60L35 75M50 75L65 60" stroke="#4B4036" strokeWidth="0.5"/>
                    </svg>
                  </div>
                </motion.div>

                <motion.p variants={revealUp} className="text-[#4B4036] text-base md:text-[18px] leading-[1.8] mb-12 max-w-xl font-lato">
                  {aboutInfo.description}
                </motion.p>

                <motion.div variants={revealUp} className="grid grid-cols-3 gap-12 items-end mb-12">
                  {[
                    { value: aboutInfo.stats.rating, label: aboutInfo.stats.ratingCount, stars: true },
                    { value: aboutInfo.stats.customers, label: aboutInfo.stats.customersLabel, multiline: true },
                    { value: null, label: aboutInfo.stats.peoplesLabel, teams: true },
                  ].map((col, ci) => (
                    <motion.div key={ci} custom={ci} variants={statVariants}>
                      {col.stars && (
                        <>
                          <div className="text-5xl md:text-6xl font-cormorant text-[#4B4036] mb-4">{aboutInfo.stats.rating}</div>
                          <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4].map((s) => (
                              <Star key={s} size={14} fill="#4B4036" stroke="#4B4036" />
                            ))}
                            <Star size={14} fill="#E5D9CC" stroke="#E5D9CC" />
                          </div>
                          <div className="text-[10px] tracking-[0.2em] text-[#4B4036]/60 uppercase">{aboutInfo.stats.ratingCount}</div>
                        </>
                      )}
                      {col.multiline && (
                        <>
                          <div className="text-5xl md:text-6xl font-cormorant text-[#4B4036] mb-4">{aboutInfo.stats.customers}</div>
                          <div className="text-[10px] tracking-[0.2em] text-[#4B4036]/60 uppercase leading-relaxed">
                            {aboutInfo.stats.customersLabel.split(' ').map((word, i) => (
                              <span key={i} className="block">{word}</span>
                            ))}
                          </div>
                        </>
                      )}
                      {col.teams && (
                        <>
                          <div className="flex items-center -space-x-4 mb-4">
                            {aboutInfo.teamImages.map((img, i) => (
                              <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden relative">
                                <Image src={img} alt="team" fill className="object-cover" />
                              </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-4 border-white bg-[#4B4036] flex items-center justify-center text-white text-[10px] font-bold relative z-10">
                              +{aboutInfo.extraPeoples}
                            </div>
                          </div>
                          <div className="text-[10px] tracking-[0.2em] text-[#4B4036]/60 uppercase leading-relaxed">
                            {aboutInfo.stats.peoplesLabel.split(' ').map((word, i) => (
                              <span key={i} className={`block ${i === 1 ? 'mt-0' : ''}`}>{word}</span>
                            ))}
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={revealUp}>
                  <Link
                    href={aboutInfo.buttonLink}
                    className="inline-block px-10 py-3.5 lg:mx-0 mx-auto bg-[#4B4036] text-white text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-black transition-all duration-300"
                  >
                    {aboutInfo.buttonText}
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={imageReveal}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative aspect-4/5 w-full max-w-lg mx-auto overflow-hidden shadow-2xl"
                   style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}>
                {showVideo ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${aboutInfo.videoUrl}?autoplay=1`}
                    title="About Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <>
                    <Image
                      src={aboutInfo.videoThumbnail}
                      alt="About Wellness"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 m-auto w-24 h-24 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-[#4B4036] hover:scale-110 transition-transform group"
                    >
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </div>
                    </button>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
