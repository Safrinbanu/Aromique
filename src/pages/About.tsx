import logoImg from "../assets/images/logo.png";
import FloatingActions from "@/components/FloatingActions";
import { siteConfig } from "@/lib/siteConfig";

import Image from "../assets/images/bg2.jpg";
import heroImg from "../assets/images/image3.jpg";

export default function About() {
  return (
    <div className="animate-in fade-in duration-700">

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



      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">








          
          <div className="text-center mb-16">
            <div className="flex flex-col items-center mb-12">
              <img src={logoImg} alt={`${siteConfig.name} Logo`} className="h-28 w-auto mb-6 dark:invert-0 animate-in  zoom-in duration-1000" />
              <h2 className="font-sans text-[12px] tracking-[0.6em] text-accent font-medium uppercase">
                {siteConfig.name}
              </h2>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl mb-8 tracking-tight">Our Story</h1>
            <div className="w-12 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {siteConfig.name} was started with one idea: a signature scent should feel personal, look beautiful and never cost a fortune.
            </p>
          </div>

          <div className="aspect-[21/9] w-full overflow-hidden mb-16 rounded-3xl">
            <img 
              src={Image} 
              alt={`${siteConfig.name} Studio`} 
              className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl mb-6 text-foreground">The Vision</h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                We believe a fragrance is an invisible extension of your personality. {siteConfig.name} exists to help you find the one that fits you perfectly.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed">
                By curating the fragrances people truly love, from iconic designer bottles to our own signature scents, we offer a collection that feels luxurious without the usual markup.
              </p>
            </div>
            
            <div className="bg-secondary/60 p-8 rounded-3xl border border-border/50">
              <h2 className="font-serif text-2xl mb-6 text-foreground">Our Promise</h2>
              <ul className="space-y-4 text-muted-foreground font-light">
                <li className="flex gap-4">
                  <span className="text-primary font-serif italic text-xl">01</span>
                  <span><strong>100% Authentic.</strong> Every bottle is genuine, sealed and checked before it leaves us.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-serif italic text-xl">02</span>
                  <span><strong>Carefully Packed.</strong> Each order is wrapped with care so it arrives fresh and intact.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-serif italic text-xl">03</span>
                  <span><strong>Honest Guidance.</strong> Not sure what suits you? We will help you choose, no pressure.</span>
                </li>
              </ul>
            </div>
          </div>


{/* ================= CRAFTSMANSHIP ================= */}
<div className="mt-24 grid md:grid-cols-2 gap-16 items-center">
  <div className="aspect-[4/5] overflow-hidden rounded-3xl">
    <img
      src={heroImg}
      alt="Perfume Craftsmanship"
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
    />
  </div>

  <div>
    <h2 className="font-serif text-3xl mb-6">How We Choose</h2>
    <p className="text-muted-foreground font-light leading-relaxed mb-6">
      Every fragrance in our collection is chosen for how it unfolds, from the bright top notes
      of the first spray to the warm base that lingers through the last hour of the day.
    </p>
    <p className="text-muted-foreground font-light leading-relaxed">
      We look for scents that feel personal, timeless and memorable, the ones people ask you about.
    </p>
  </div>
</div>



<FloatingActions />


        </div>
      </div>
    </div>
  );
}
