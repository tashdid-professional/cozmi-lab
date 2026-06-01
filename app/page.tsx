import { Hero } from "./components/Hero";
import { LatestBlog } from "./components/LatestBlog";
import { Testimonials } from "./components/Testimonials";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { ShopCategory } from "./components/ShopCategory";
import { ProductSpecialty } from "./components/ProductSpecialty";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductSpecialty />
      <ShopCategory />
      <FeaturedProducts />
      <Testimonials />
      <LatestBlog />
    </div>
  );
}
