import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredPerfumes, newArrivals } from "@/lib/data";
import { PerfumeCard } from "@/components/PerfumeCard";
import heroImg from "../assets/images/hero-wide.jpg";
import { ArrowRight, Truck, ShieldCheck, RefreshCcw, Sparkles } from "lucide-react";
import FloatingActions from "@/components/FloatingActions";
import DiscountPopup from "@/components/DiscountPopup";
import { siteConfig } from "@/lib/siteConfig";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="relative -mt-4 min-h-[75vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Your perfume is your silent introduction"
            className="w-full h-full object-cover object-right brightness-100 contrast-110 transition-all duration-1000"
          />
          <div className="absolute inset-0 md:hidden bg-black/60" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-in fade-in slide-in-from-left-12 duration-1000">
            <Badge className="mb-6 py-1.5 px-4 bg-white/10 text-amber-200 hover:bg-white/20 border border-white/15 tracking-[0.2em] uppercase text-[10px] font-bold">
              New Collection 2026
            </Badge>
            <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.95] mb-8 tracking-tighter">
              Where Scent <br />
              <span className="text-amber-300 italic font-light">Becomes</span> <br />
              Signature
            </h1>
            <p className="text-lg md:text-xl text-white/75 mb-12 font-light leading-relaxed max-w-lg">
              Authentic designer perfumes and our own signature scents, curated in one place. Find the fragrance that feels unmistakably you.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row w-full max-w-md">
              <Link href="/categories" className="w-full">
                <Button className="h-14 md:h-16 w-full text-sm md:text-base bg-white text-black hover:bg-amber-300 hover:text-black transition-all duration-300 tracking-widest uppercase font-semibold rounded-none shadow-xl">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/about" className="w-full">
                <Button
                  variant="outline"
                  className="h-14 md:h-16 w-full text-sm md:text-base border-white/40 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest uppercase font-semibold rounded-none"
                >
                  Discover {siteConfig.name}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-card border border-border/60 rounded-2xl shadow-lg p-6">
          {[
            { icon: Truck, title: "Free Delivery", text: "On all orders above ₹999" },
            { icon: ShieldCheck, title: "100% Authentic", text: "Genuine oils, sealed bottles" },
            { icon: RefreshCcw, title: "Easy Returns", text: "7-day hassle-free returns" },
            { icon: Sparkles, title: "Free Sample Vial", text: "Included with every order" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground font-light">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs font-medium tracking-[0.3em] text-accent uppercase mb-2">Top Picks</h2>
            <h3 className="text-3xl md:text-4xl font-serif">Featured Collection</h3>
          </div>
          <Link href="/categories" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPerfumes.map(perfume => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
        
        <div className="mt-8 sm:hidden">
          <Link href="/categories">
            <Button variant="outline" className="w-full">View All Collection</Button>
          </Link>
        </div>
      </section>

 {/* Philosophy Banner */}
<section
  className="relative py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center"
  style={{
    backgroundImage: "url('/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative max-w-3xl mx-auto text-white z-10">
    <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
      "A perfume is like a piece of clothing, a message, a way of presenting oneself, 
      a costume that differs according to the woman who wears it."
    </h2>
    <p className="tracking-widest uppercase text-sm font-medium text-amber-300">
      Paloma Picasso
    </p>
  </div>
</section>

      {/* New Arrivals Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-xs font-medium tracking-[0.3em] text-accent uppercase mb-2">Just Landed</h2>
          <h3 className="text-3xl md:text-4xl font-serif mb-4">New Arrivals</h3>
          <p className="text-muted-foreground font-light">
            Fresh arrivals just added to the collection. Stock is limited, so grab your favourite early.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map(perfume => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>


        <div className="mt-24 bg-secondary/30 border border-border/50 rounded-lg p-10 text-center">
  <h2 className="font-serif text-3xl mb-6">The {siteConfig.name} Experience</h2>
  <p className="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
    From minimalist packaging to carefully curated scent profiles, every detail is
    designed to create a luxurious unboxing and wearing experience. {siteConfig.name}
    isn't just a perfume — it's a statement of style and individuality.
  </p>
</div>

<FloatingActions />
<DiscountPopup />



















      </section>





    </div>
  );
}