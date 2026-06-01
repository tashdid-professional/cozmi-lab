import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-transparent">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image 
          src="/images/logo.png" 
          alt="Creamz Logo" 
          width={50} 
          height={40} 
          className="object-contain"
          priority
        />
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-12 font-bold text-xs tracking-[1.8px] text-custom">
        <Link href="/" className="hover:text-custom2 transition-colors uppercase">Home</Link>
        <Link href="/shop" className="hover:text-custom2 transition-colors uppercase">Shop</Link>
        <Link href="/about" className="hover:text-custom2 transition-colors uppercase">About</Link>
        <Link href="/contact" className="hover:text-custom2 transition-colors uppercase">Contact Us</Link>
      </div>

      {/* Search Button */}
      <div className="flex items-center">
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer" aria-label="Search">
          <Search size={32} className="text-custom" strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}
