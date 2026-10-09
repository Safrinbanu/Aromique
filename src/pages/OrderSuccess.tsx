import { Link } from "wouter";
import { CheckCircle2, MapPin, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, formatINR, paymentNames } from "@/lib/cart";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

export default function OrderSuccess() {
  const { lastOrder: order } = useCart();

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-xl">
        <h1 className="font-serif text-3xl mb-3">No recent order</h1>
        <p className="text-muted-foreground font-light mb-8">Place an order and the confirmation will show up here.</p>
        <Link href="/categories">
          <Button className="rounded-full h-12 px-8 tracking-widest uppercase text-sm">Shop Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle2 className="w-11 h-11 text-primary" />
        </div>
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2">Order Confirmed</p>
        <h1 className="font-serif text-4xl mb-3">Thank you, {order.address.fullName.split(" ")[0]}!</h1>
        <p className="text-muted-foreground font-light">
          Your order <span className="font-medium text-foreground">#{order.id}</span> has been placed.
          <br />This is a demo order, so nothing will actually be shipped.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
          <Truck className="w-5 h-5 text-primary mb-2" />
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Estimated delivery</p>
          <p className="text-sm font-medium">{fmt(order.eta)}</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
          <MapPin className="w-5 h-5 text-primary mb-2" />
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Delivering to</p>
          <p className="text-sm leading-relaxed">
            {order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city}, {order.address.state} - {order.address.pincode}
          </p>
        </div>
        <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
          <CreditCard className="w-5 h-5 text-primary mb-2" />
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Payment</p>
          <p className="text-sm font-medium">{paymentNames[order.paymentMethod]}</p>
          <p className="text-xs text-muted-foreground">{order.paymentLabel}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6 shadow-sm mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Placed on {fmt(order.placedAt)}</p>
        <ul className="divide-y divide-border/50">
          {order.items.map((it) => (
            <li key={it.id} className="flex items-center gap-4 py-3">
              <img src={it.imageUrl} alt={it.name} className="w-14 h-16 rounded-lg object-cover bg-muted" />
              <div className="flex-1 min-w-0">
                <p className="font-serif truncate">{it.name}</p>
                <p className="text-xs text-muted-foreground">Qty {it.qty} · {formatINR(it.price)} each</p>
              </div>
              <p className="text-sm font-medium">{formatINR(it.price * it.qty)}</p>
            </li>
          ))}
        </ul>
        <div className="space-y-2 text-sm border-t border-border/60 mt-2 pt-4">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{order.delivery === 0 ? "Free" : formatINR(order.delivery)}</span></div>
          <div className="flex justify-between pt-2 text-base font-medium"><span>Total</span><span className="font-serif text-xl text-primary">{formatINR(order.total)}</span></div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/categories">
          <Button className="rounded-full h-12 px-8 tracking-widest uppercase text-sm">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
