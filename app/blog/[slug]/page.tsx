"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Search } from "lucide-react";
import { blogs } from "@/public/datas/blogs";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const blog = blogs.find((b) => b.slug === slug);
  const currentIndex = blogs.findIndex((b) => b.slug === slug);
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  const [searchQuery, setSearchQuery] = useState("");

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-cormorant italic">Blog post not found</h1>
        <Link href="/blog" className="text-custom underline mt-4">Return to Blog</Link>
      </div>
    );
  }

  // Derived data for sidebar
  const categories = Array.from(new Set(blogs.map((b) => b.category)));
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: blogs.filter((b) => b.category === cat).length,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow bg-white">
        {/* Breadcrumb Section - Standardized Pattern */}
        <div className="bg-[#FAF6F1] pt-32 pb-16 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-[64px] font-cormorant italic text-[#4B4036] mb-6">
              Blog Details
            </h1>
            <div className="flex items-center justify-center gap-3 text-[11px] md:text-[11px] uppercase tracking-[0.2em] text-custom font-medium font-lato">
              <span className="text-custom font-medium">Home</span>
              <span className="text-neutral-300">/</span>
              <Link href="/blog" className="text-[#4B4036]/60 hover:text-black transition-colors">Blog</Link>
              <span className="text-neutral-300">/</span>
              <span className="text-[#4B4036]/60 truncate max-w-[200px]">{blog.title}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Blog Content (Left) */}
            <div className="lg:w-[70%]">
              <article className="space-y-8">
                {/* Blog Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-[12px] uppercase tracking-[0.2em] text-[#4B4036]/60 font-lato">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 bg-[#4B4036]/20 rounded-full"></span>
                  <span>By {blog.author}</span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-cormorant italic text-[#4B4036] leading-tight">
                  {blog.title}
                </h2>

                {/* Description - Justified and Aligned */}
                <div className="font-lato text-custom leading-relaxed text-justify space-y-6 text-[16px]">
                  <p>{blog.description}</p>
                  {/* Additional dummy text if needed to make it look substantial like a real post */}
                  <p>In dictum non consectetur a erat nam at lectus urna. Pulvinar mattis nunc sed blandit libero volutpat sed cras ornare. Nibh sit amet commodo nulla facilisi nullam vehicula. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Enim sed faucibus turpis in hac habitasse platea dictumst quisque.</p>
                </div>

                {/* Navigation - Previous/Next Buttons */}
                <div className="pt-16 pb-8 border-t border-neutral-100 flex items-center justify-between">
                  {prevBlog ? (
                    <Link 
                      href={`/blog/${prevBlog.slug}`}
                      className="group flex flex-col gap-2 items-start text-left max-w-[45%]"
                    >
                      <span className="text-[10px] font-lato font-bold tracking-[0.3em] uppercase text-[#4B4036]/40 group-hover:text-custom transition-colors">
                        ← Previous Post
                      </span>
                      <span className="text-lg md:text-xl font-cormorant italic text-[#4B4036] line-clamp-1 group-hover:text-[#b2a69b] transition-colors">
                        {prevBlog.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextBlog ? (
                    <Link 
                      href={`/blog/${nextBlog.slug}`}
                      className="group flex flex-col gap-2 items-end text-right max-w-[45%]"
                    >
                      <span className="text-[10px] font-lato font-bold tracking-[0.3em] uppercase text-[#4B4036]/40 group-hover:text-custom transition-colors">
                        Next Post →
                      </span>
                      <span className="text-lg md:text-xl font-cormorant italic text-[#4B4036] line-clamp-1 group-hover:text-[#b2a69b] transition-colors">
                        {nextBlog.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </article>
            </div>

            {/* Sidebar (Right) - Same Design as Shop/Blog List */}
            <aside className="lg:w-[30%] space-y-12">
              {/* Search Widget */}
              <div className="space-y-6">
                <h3 className="text-[36px] font-cormorant italic text-[#4B4036]">
                  Search
                </h3>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="SEARCH ARTICLES..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-b border-neutral-200 py-3 pr-10 text-[14px] font-lato tracking-[0.2em] outline-none focus:border-custom transition-colors"
                  />
                  <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B4036]/40 group-focus-within:text-custom transition-colors cursor-pointer" />
                </div>
              </div>

              {/* Categories Widget */}
              <div className="space-y-6">
                <h3 className="text-[36px] font-cormorant italic text-[#4B4036]">
                  Blog categories
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/blog"
                      className="text-[14px] font-lato tracking-[0.2em] uppercase transition-colors hover:text-custom w-full text-left text-[#4B4036]/60 block"
                    >
                      All Articles ({blogs.length})
                    </Link>
                  </li>
                  {categoryCounts.map((cat) => (
                    <li key={cat.name}>
                      <Link
                        href={`/blog?category=${cat.name}`}
                        className={`text-[14px] font-lato tracking-[0.2em] uppercase transition-colors hover:text-custom w-full text-left block ${
                          blog.category === cat.name ? "text-custom font-bold" : "text-[#4B4036]/60"
                        }`}
                      >
                        {cat.name} ({cat.count})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
