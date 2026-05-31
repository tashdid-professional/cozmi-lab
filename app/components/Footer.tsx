import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Send, Star } from "lucide-react";
import { footerData } from "@/public/datas/homepage";

export function Footer() {
  return (
    <footer className="bg-[#4A3728] text-white pt-20 pb-10 px-8 ">
      {/* Instagram Space Section */}
      <div className="absolute left-0 right-0 -top-1 translate-y-[-100%]">
        <div className="py-20 text-center relative bg-[#4A3728]">
          <div className="relative inline-block">
             <h2 className="text-5xl headline italic text-white mb-2 relative z-10">Instagram Space</h2>
             {/* Decorative leaf/flourish background */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-white stroke-1">
                    <path d="M50 10 C50 10 30 40 50 60 M50 10 C50 10 70 40 50 60 M50 30 C50 30 20 50 50 70 M50 30 C50 30 80 50 50 70 M50 50 C50 50 10 70 50 90 M50 50 C50 50 90 70 50 90" />
                </svg>
             </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-0">
          {footerData.instagramImages.map((img, idx) => (
            <Link key={idx} href="https://instagram.com" target="_blank" className="relative aspect-square overflow-hidden group block">
              <Image
                src={img}
                alt={`Instagram ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram size={32} className="text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-[600px] border-t border-white/10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/images/logo.png" alt="Logo" width={100} height={30} className="brightness-0 invert" />
            </Link>
            <p className="text-gray-300 font-lato text-sm leading-relaxed">
              {footerData.description}
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-xl headline italic mb-8">Explore</h3>
            <ul className="space-y-4">
              {footerData.exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 font-lato text-sm flex items-center group">
                    <Star size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="hover:text-white transition-colors uppercase tracking-widest">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links (Reuse header but separate column) */}
          <div className="pt-14 leading-10">
             <ul className="space-y-4">
              {footerData.servicesLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 font-lato text-sm flex items-center group">
                    <Star size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="hover:text-white transition-colors uppercase tracking-widest">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl headline italic mb-8">Subscribe To Our Newsletter</h3>
            <div className="space-y-6">
               <div className="relative border-b border-gray-400 pb-2">
                 <input 
                   type="email" 
                   placeholder="YOUR MAIL" 
                   className="bg-transparent w-full font-lato text-xs tracking-[0.2em] outline-none placeholder:text-gray-400"
                 />
                 <button className="absolute right-0 top-0">
                   <Send size={18} className="text-gray-400 rotate-45" />
                 </button>
               </div>
               <p className="text-gray-400 font-lato text-[10px] uppercase tracking-wider">
                 We Won&apos;t spam. Unsubscribe at any time.
               </p>
               <div className="flex items-center gap-4 pt-4">
                  <span className="text-sm headline italic">Social Media :</span>
                  <div className="flex gap-2">
                     <Link href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#4A3728] transition-all">
                       <Facebook size={14} />
                     </Link>
                     <Link href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#4A3728] transition-all">
                       <Instagram size={14} />
                     </Link>
                     <Link href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#4A3728] transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18c0 1.54-.53 3.05-1.5 4.22-1.34 1.6-3.52 2.37-5.55 1.94-2.42-.42-4.44-2.48-4.84-4.89-.42-2.15.39-4.51 2.09-5.91C9.6 12.44 11.23 11.9 12.87 12v3.91c-1.12-.05-2.27.35-3 1.2-.55.67-.84 1.55-.78 2.42.11 1.05.82 2.01 1.79 2.41.97.41 2.11.31 3-.24.72-.45 1.18-1.24 1.2-2.09V.02z" />
                        </svg>
                     </Link>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
