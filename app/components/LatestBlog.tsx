import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/public/datas/blogs";

export function LatestBlog() {
  // Taking the first 3 blogs for the "Latest" section as per the image
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="py-24 px-8 bg-white max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16 relative">
        <div className="relative inline-block">
          <h2 className=" headline  mb-2 relative z-10">Our Latest Blog</h2>
          {/* Decorative flourish background */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-black stroke-1">
              <path d="M50 10 C50 10 30 40 50 60 M50 10 C50 10 70 40 50 60 M50 30 C50 30 20 50 50 70 M50 30 C50 30 80 50 50 70" />
            </svg>
          </div>
        </div>
        <p className="subheadline">Hot News & Updates</p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {latestBlogs.map((blog) => (
          <div key={blog.id} className="group cursor-pointer">
            {/* Blog Image */}
            <div className="relative aspect-[4/3] overflow-hidden mb-6">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Blog Content */}
            <div className="space-y-4">
              <p className="subheadline text-[12px]">
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
    </section>
  );
}
