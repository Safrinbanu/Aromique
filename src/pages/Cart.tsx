import { Link, useLocation } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, formatINR, FREE_DELIVERY_ABOVE } from "@/lib/cart";

export default function Cart() {
  const { detailed, subtotal, delivery, total, setQty, remove } = useCart();
  const [, navigate] = useLocation();

  if (detailed.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center max-w-xl">
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-primary" />
        </div>
        <h1 className="font-serif text-3xl mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground font-light mb-8">
          Looks like you haven't picked a fragrance yet. Explore the collection and add your favourites.
        </p>
        <Link href="/categories">
          <Button className="rounded-full h-12 px-8 tracking-widest uppercase text-sm">Shop Collection</Button>
        </Link>
      </div>
    );
  }

  const toFree = Math.max(FREE_DELIVERY_ABOVE - subtotal, 0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2">Your Selection</p>
      <h1 className="font-serif text-4xl mb-10">Shopping Cart</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
        {/* Items */}
        <div className="space-y-4">
          {detailed.map(({ perfume, qty }) => (
            <div key={perfume.id} className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border border-border/50 bg-card shadow-sm">
              <img src={perfume.imageUrl} alt={perfume.name} className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl object-cover bg-muted" />
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{perfume.brand}</p>
                    <h3 className="font-serif text-lg sm:text-xl truncate">{perfume.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{perfume.gender} · {perfume.type}</p>
                  </div>
                  <button
                    onClick={() => remove(perfume.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors self-start p-1"
                    aria-label={`Remove ${perfume.name}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="inline-flex items-center border border-border rounded-full">
                    <button onClick={() => setQty(perfume.id, qty - 1)} className="w-9 h-9 flex items-center justify-center hover:text-primary" aria-label="Decrease quantity">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{qty}</span>
                    <button onClick={() => setQty(perfume.id, qty + 1)} className="w-9 h-9 flex items-center justify-center hover:text-primary" aria-label="Increase quantity">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-xl text-primary">{formatINR(perfume.actualprice * qty)}</p>
                    {qty > 1 && <p className="text-xs text-muted-foreground">{formatINR(perfume.actualprice)} each</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link href="/categories" className="inline-block text-sm text-primary hover:text-accent transition-colors pt-2">
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 rounded-2xl border border-border/50 bg-secondary/30 p-6">
          <h2 className="font-serif text-2xl mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>{delivery === 0 ? "Free" : formatINR(delivery)}</span>
            </div>
            <div className="border-t border-border/60 pt-3 flex justify-between text-base font-medium">
              <span>Total</span><span className="font-serif text-xl text-primary">{formatINR(total)}</span>
            </div>
          </div>
          {toFree > 0 && (
            <p className="text-xs text-muted-foreground mt-4">Add {formatINR(toFree)} more for free delivery.</p>
          )}
          <Button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 rounded-full h-12 tracking-widest uppercase text-sm"
          >
            Proceed to Checkout
          </Button>
        </aside>
      </div>
    </div>
  );
}
