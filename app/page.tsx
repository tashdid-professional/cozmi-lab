"use client";

import { Hero } from "./components/Hero";
import { LatestBlog } from "./components/LatestBlog";
import { Testimonials } from "./components/Testimonials";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { ShopCategory } from "./components/ShopCategory";
import { ProductSpecialty } from "./components/ProductSpecialty";
import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
    }
  }
};

function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={revealVariants}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <AnimatedSection>
        <Hero />
      </AnimatedSection>
      
      <AnimatedSection>
        <ProductSpecialty />
      </AnimatedSection>
      
      <AnimatedSection>
        <ShopCategory />
      </AnimatedSection>
      
      <AnimatedSection>
        <FeaturedProducts />
      </AnimatedSection>
      
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      
      <AnimatedSection>
        <LatestBlog />
      </AnimatedSection>
    </div>
  );
}
