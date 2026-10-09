import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Perfume } from "@/lib/data";
import { useLocation } from "wouter";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";

interface PerfumeCardProps {
  perfume: Perfume;
}

export function PerfumeCard({ perfume }: PerfumeCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const images =
    perfume.gallery && perfume.gallery.length > 0
      ? perfume.gallery
      : [perfume.imageUrl];

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const [, navigate] = useLocation();
  const { add } = useCart();

  const handleAdd = () => {
    add(perfume.id);
    toast({
      title: "Added to cart",
      description: `${perfume.name} is in your cart.`,
    });
  };

  const handleBuyNow = () => {
    add(perfume.id);
    navigate("/checkout");
  };

  return (
    <Card className="overflow-hidden rounded-3xl border-border/40 hover:border-accent/60 transition-all duration-500 group bg-card shadow-sm hover:shadow-2xl hover:-translate-y-1.5">

      {/* IMAGE SECTION */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={images[currentImage]}
          alt={perfume.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />

        {/* LEFT ARROW */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 z-10 transition"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* RIGHT ARROW */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full p-2 z-10 transition"
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* DOTS */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-300 rounded-full ${
                  currentImage === index
                    ? "w-5 h-2 bg-white"
                    : "w-2 h-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge
            variant="secondary"
            className="bg-background/80 backdrop-blur-sm text-xs"
          >
            {perfume.gender}
          </Badge>

          <Badge
            variant="outline"
            className="bg-background/80 backdrop-blur-sm border-primary/20 text-primary text-xs"
          >
            {perfume.type}
          </Badge>
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              {perfume.brand}
            </p>

            <h3
              className="font-serif text-xl font-medium"
              data-testid={`text-perfume-name-${perfume.id}`}
            >
              {perfume.name}
            </h3>       
          </div>

          {/* PRICE SECTION */}
          <div className="flex flex-col items-end">
            <span className="text-sm text-muted-foreground line-through decoration-accent decoration-2">
              ₹{perfume.price.toLocaleString("en-IN")}
            </span>

            <span className="font-serif text-xl font-semibold text-primary">
              ₹{perfume.actualprice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mt-3 mb-4 font-light leading-relaxed">
          {perfume.description}
        </p>

        <div className="mb-6">
          <p className="text-xs font-medium text-foreground mb-2">
            SCENT NOTES
          </p>

          <div className="flex flex-wrap gap-1.5">
            {perfume.notes.map((note) => (
              <span
                key={note}
                className="text-xs px-2.5 py-1 bg-secondary rounded-full text-secondary-foreground font-light"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleAdd}
            variant="outline"
            className="rounded-full h-12 text-xs tracking-widest uppercase border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            data-testid={`button-add-${perfume.id}`}
          >
            <ShoppingBag className="w-4 h-4" /> Add
          </Button>
          <Button
            onClick={handleBuyNow}
            className="rounded-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors h-12 text-xs tracking-widest uppercase"
            data-testid={`button-order-${perfume.id}`}
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}