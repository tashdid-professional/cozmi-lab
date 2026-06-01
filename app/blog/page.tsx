"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { blogs } from "@/public/datas/blogs";

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Derived data
  const categories = Array.from(new Set(blogs.map((b) => b.category)));
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: blogs.filter((b) => b.category === cat).length,
  }));

  // Filtering logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? blog.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow bg-white">
        {/* Breadcrumb Section */}
        <div className="bg-[#FAF6F1] pt-32 pb-16 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-[64px] font-cormorant italic text-[#4B4036] mb-6">
              Blog
            </h1>
            <div className="flex items-center justify-center gap-3 text-[11px] md:text-[11px] uppercase tracking-[0.2em] text-custom font-medium font-lato">
              <span className="text-custom font-medium">Home</span>
              <span className="text-neutral-300">/</span>
              <Link href="/blog" className="text-[#4B4036]/60 hover:text-black transition-colors">Blog</Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Blog Grid */}
            <div className="lg:w-[70%]">
              {currentBlogs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                    {currentBlogs.map((blog) => (
                      <div key={blog.id} className="group cursor-pointer">
                        {/* Blog Image */}
                        <div className="relative aspect-[16/9] overflow-hidden mb-6">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        {/* Blog Content */}
                        <div className="space-y-4">
                          <p className="subheadline text-[12px] uppercase tracking-[0.2em] text-[#4B4036]/60">
                            {blog.date}
                          </p>
                          <h3 className="headline text-[30px] font-semibold leading-tight group-hover:text-[#4A3728] transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="font-lato text-custom leading-relaxed line-clamp-2">
                            {blog.excerpt}
                          </p>
                          <Link 
                            href={`/blog/${blog.slug}`}
                            className="inline-block font-lato text-[14px] tracking-[0.2em] text-[#333] uppercase border-b border-[#333] pb-1 hover:text-gray-500 hover:border-gray-500 transition-all pt-2"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-20 flex justify-center items-center gap-4">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`min-w-10 h-10 px-2 flex items-center justify-center text-[12px] font-lato tracking-widest transition-all duration-300 ${
                            currentPage === page
                              ? "bg-custom text-white"
                              : "text-[#4B4036] hover:text-custom"
                          }`}
                        >
                          {page.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-[#4B4036]/60 font-lato text-lg">
                    No articles found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="mt-4 text-custom underline underline-offset-4 hover:text-black"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
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
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`text-[14px] font-lato tracking-[0.2em] uppercase transition-colors hover:text-custom w-full text-left ${
                        selectedCategory === null ? "text-custom font-bold" : "text-[#4B4036]/60"
                      }`}
                    >
                      All Articles ({blogs.length})
                    </button>
                  </li>
                  {categoryCounts.map((cat) => (
                    <li key={cat.name}>
                      <button
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`text-[14px] font-lato tracking-[0.2em] uppercase transition-colors hover:text-custom w-full text-left ${
                          selectedCategory === cat.name ? "text-custom font-bold" : "text-[#4B4036]/60"
                        }`}
                      >
                        {cat.name} ({cat.count})
                      </button>
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
