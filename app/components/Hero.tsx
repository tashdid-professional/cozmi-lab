import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center overflow-hidden bg-[#F5F2F0]">
      {/* Background Image / Content */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Luxury Cosmetics Banner"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl space-y-8">
          <div className="space-y-4">
            <span className="subheadline">
              Luxury Beauty Collection
            </span>
            <h1 className="headline md:text-[84px] text-[56px] leading-[1.1] normal-case not-italic block">
              Reveal Your <br />
              <span className="italic">Natural Radiance</span>
            </h1>
          </div>
          
          <p className="font-lato text-[#4B4036] text-[18px] max-w-lg leading-relaxed">
            Discover our premium range of organic skincare and cosmetics, 
            crafted to enhance your natural beauty with pure, ethically sourced ingredients.
          </p>

          <div className="pt-4">
            <Link 
              href="/shop"
              className="inline-block bg-[#4B4036] text-white px-10 py-5 text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-black transition-all duration-300"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
