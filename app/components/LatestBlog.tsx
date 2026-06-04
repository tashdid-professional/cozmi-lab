"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getBlogs } from "@/src/services/api";
import type { Blog } from "@/src/types";

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.15 },
  }),
};

export function LatestBlog() {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getBlogs().then((blogs) => setLatestBlogs(blogs.filter((b) => b.isFeatured).slice(0, 3)));
  }, []);

  if (latestBlogs.length === 0) return null;

  return (
    <section className="py-24 px-8 bg-white max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={headerVariants}
        className="text-center mb-16 relative"
      >
        <div className="relative inline-block">
          <h2 className="headline mb-2 relative z-10 font-medium">Our Latest Blog</h2>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-black stroke-1">
              <path d="M50 10 C50 10 30 40 50 60 M50 10 C50 10 70 40 50 60 M50 30 C50 30 20 50 50 70 M50 30 C50 30 80 50 50 70" />
            </svg>
          </div>
        </div>
        <p className="subheadline tracking-[3.25px] text-[14px] font-medium">Hot News & Updates</p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {latestBlogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            custom={i}
            variants={cardVariants}
            className="group cursor-pointer"
          >
            <Link href={`/blog/${blog.slug}`}>
              <div className="relative aspect-[16/9] overflow-hidden mb-6">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-4">
                <p className="subheadline text-[12px]">{blog.date}</p>
                <h3 className="headline text-[30px] font-semibold leading-tight group-hover:text-[#4A3728] transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="font-lato text-custom leading-relaxed line-clamp-2">{blog.excerpt}</p>
                <div className="inline-block font-lato text-[14px] tracking-[0.2em] text-[#333] uppercase border-b border-[#333] pb-1 hover:text-gray-500 hover:border-gray-500 transition-all pt-2">
                  Read More
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
