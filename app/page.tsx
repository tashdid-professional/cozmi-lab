import { Hero } from "./components/Hero";
import { LatestBlog } from "./components/LatestBlog";
import { Testimonials } from "./components/Testimonials";
import { FeaturedProducts } from "./components/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <LatestBlog />
    </div>
  );
}
