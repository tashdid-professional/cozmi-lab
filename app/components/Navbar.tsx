import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-[#F3F3F3] border-b border-gray-200">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image 
          src="/images/logo.png" 
          alt="Creamz Logo" 
          width={50} 
          height={30} 
          className="object-contain"
          priority
        />
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-12 font-lato font-bold text-xs tracking-[1.8px] text-[#4b4036] ">
        <Link href="/" className="hover:text-[#b3a69b] transition-colors uppercase">Home</Link>
        <Link href="/shop" className="hover:text-[#b3a69b] transition-colors uppercase">Shop</Link>
        <Link href="/about" className="hover:text-[#b3a69b] transition-colors uppercase">About</Link>
        <Link href="/contact" className="hover:text-[#b3a69b] transition-colors uppercase">Contact Us</Link>
      </div>

      {/* Search Button */}
      <div className="flex items-center">
        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer" aria-label="Search">
          <Search size={22} className="text-[#333]" />
        </button>
      </div>
    </nav>
  );
}
