"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { products } from "@/public/datas/products";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Sticky logic
      if (currentScrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Show/Hide on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
          isSticky ? "bg-[#F3F3F3]  text-black" : "bg-transparent text-custom"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
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

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-12 font-bold text-xs tracking-[1.8px]">
          <Link href="/" className="hover:text-custom2 transition-colors uppercase">Home</Link>
          <Link href="/shop" className="hover:text-custom2 transition-colors uppercase">Shop</Link>
          <Link href="/about" className="hover:text-custom2 transition-colors uppercase">About</Link>
          <Link href="/contact" className="hover:text-custom2 transition-colors uppercase">Contact Us</Link>
        </div>

        {/* Search & Mobile Menu Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer" 
            aria-label="Search"
          >
            <Search size={24} className={isSticky ? "text-black" : "text-custom"} strokeWidth={1.5} />
          </button>
          
          <button 
            className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-60 bg-white flex flex-col items-center justify-center p-8"
          >
            <button 
              className="absolute top-6 right-8 p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-xl font-bold tracking-widest uppercase text-custom">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 bg-white/95 flex flex-col items-center pt-24 px-8"
          >
            <button 
              className="absolute top-6 right-8 p-2"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
            >
              <X size={32} />
            </button>
            <div className="w-full max-w-2xl">
              <input 
                autoFocus
                type="text"
                placeholder="Search products..."
                className="w-full text-4xl border-b-2 border-custom py-4 outline-none bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <div className="mt-8 flex flex-col gap-4">
                {searchQuery && filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <Link 
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="flex items-center gap-4 p-4 hover:bg-black/5 rounded-lg transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <div className="w-16 h-16 relative shrink-0">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-custom">{product.name}</h3>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))
                ) : searchQuery ? (
                  <p className="text-center text-gray-500 text-lg">No products found matching "{searchQuery}"</p>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
