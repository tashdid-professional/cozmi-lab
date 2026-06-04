"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { getContactData } from "@/src/services/api";
import type { ContactData } from "@/src/types";

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactData | null>(null);

  useEffect(() => {
    getContactData().then(setContactInfo);
  }, []);

  if (!contactInfo) return null;

  const iconMap: { [key: string]: any } = {
    Linkedin: Linkedin,
    Facebook: Facebook,
    Instagram: Instagram,
  };

  const revealUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const leftReveal = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const rightReveal = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 },
    }),
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const, delay: i * 0.12 },
    }),
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
              Contact Us
            </h1>
            <div className="flex items-center justify-center gap-3 text-[11px] md:text-[11px] tracking-[0.2em] text-custom font-medium font-lato">
              <span className="text-custom font-medium uppercase">Home</span>
              <span className="text-neutral-300">/</span>
              <Link href="/contact" className="text-[#4B4036]/60 hover:text-black transition-colors uppercase">Contact Us</Link>
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 lg:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={leftReveal}
            >
              <motion.div
                variants={revealUp}
                className="relative mb-8 md:mb-10"
              >
                <h2 className="text-4xl md:text-[48px] font-cormorant italic text-[#4B4036] relative z-10 font-medium">
                  Contact Us
                </h2>
              </motion.div>

              <motion.p variants={revealUp} className="text-base md:text-[18px] leading-[1.8] mb-12 max-w-lg">
                {contactInfo.description}
              </motion.p>

              <motion.div variants={revealUp} className="space-y-6 text-[#4B4036]">
                <p className="text-sm md:text-base">
                  <span className="font-bold text-[18px] mr-2">Address:</span>
                  <span className="text-[#4b4036]">{contactInfo.address}</span>
                </p>
                <div className="flex flex-wrap gap-x-12 gap-y-4">
                  <p className="text-sm md:text-base">
                    <span className="font-bold text-[18px] mr-2">Mail:</span>
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-black transition-colors">{contactInfo.email}</a>
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-bold text-[18px] mr-2">Phone:</span>
                    <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="hover:text-black transition-colors">{contactInfo.phone}</a>
                  </p>
                </div>
              </motion.div>

              <motion.div variants={revealUp} className="mt-12">
                <p className="font-bold text-[18px] text-[#4B4036] mb-6">Social Media :</p>
                <div className="flex gap-4">
                  {contactInfo.socials.map((social, idx) => {
                    const Icon = iconMap[social.icon as keyof typeof iconMap];
                    return (
                      <motion.a
                        key={idx}
                        custom={idx}
                        variants={socialVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        href={social.href}
                        className="w-10 h-10 rounded-full bg-[#4B4036] flex items-center justify-center text-white hover:bg-black transition-all"
                      >
                        {Icon && <Icon size={18} {...(social.icon !== 'Instagram' ? { fill: "currentColor" } : {})} />}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={rightReveal}
            >
              <form className="space-y-10">
                {['YOUR NAME', 'YOUR EMAIL', 'CONTACT NUMBER'].map((placeholder, i) => (
                  <motion.div key={i} custom={i} variants={fieldVariants} className="relative group">
                    <input
                      type={i === 1 ? 'email' : i === 2 ? 'tel' : 'text'}
                      placeholder={placeholder}
                      className="w-full py-4 bg-transparent border-b border-neutral-200 outline-none focus:border-[#4B4036] transition-all text-[14px] tracking-[0.2em] placeholder:text-neutral-400"
                    />
                  </motion.div>
                ))}
                <motion.div custom={3} variants={fieldVariants} className="relative group">
                  <textarea
                    placeholder="COMMENTS"
                    rows={4}
                    className="w-full py-4 bg-transparent border-b border-neutral-200 outline-none focus:border-[#4B4036] transition-all text-[14px] tracking-[0.2em] placeholder:text-neutral-400 resize-none"
                  ></textarea>
                </motion.div>

                <motion.div custom={4} variants={fieldVariants}>
                  <button
                    type="submit"
                    className="px-10 py-3 bg-[#4B4036] text-white text-[11px] tracking-[0.2em] font-medium hover:bg-black transition-all duration-300 uppercase"
                  >
                    Send Message
                  </button>
                </motion.div>
              </form>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
