import { useEffect, useState } from "react";
import { X } from "lucide-react";
import heroImg from "../assets/images/popup.jpg";
import { siteConfig } from "@/lib/siteConfig";

export default function DiscountPopup() {
  const [open, setOpen] = useState(false);

  // show popup after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 800); // delay for smooth feel

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      
      {/* Popup Card */}
      <div className="relative w-full max-w-xl bg-background rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 bg-background/80 hover:bg-background p-2 rounded-full shadow"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Banner */}
        <img
          src={heroImg}
          alt="Discount Offer"
          className="w-full h-[260px] sm:h-[320px] object-cover object-center"
        />

        {/* Content */}
        <div className="p-6 text-center">
          <h2 className="font-serif text-3xl mb-3">Welcome Offer</h2>
          <p className="text-muted-foreground font-light mb-6">
            Enjoy up to 40% off on selected {siteConfig.name} fragrances.
            Limited-time offer, order today.
          </p>

          <button
            onClick={() => setOpen(false)}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}