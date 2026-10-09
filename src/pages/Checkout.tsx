import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Check, Loader2, Lock, MapPin, CreditCard, ClipboardList, Smartphone, Landmark, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useCart,
  formatINR,
  paymentNames,
  type Address,
  type PaymentMethod,
  type Order,
} from "@/lib/cart";

const steps = [
  { key: "address", label: "Delivery", icon: MapPin },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "review", label: "Review", icon: ClipboardList },
] as const;

const banks = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank", "Other Bank"];

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="block text-xs font-medium tracking-wide text-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}

const inputCls = "h-11 rounded-lg bg-background";

export default function Checkout() {
  const { detailed, subtotal, delivery, total, placeOrder } = useCart();
  const [, navigate] = useLocation();

  const [step, setStep] = useState(0);
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [bank, setBank] = useState(banks[0]);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  if (detailed.length === 0 && !processing) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-xl">
        <h1 className="font-serif text-3xl mb-3">Nothing to checkout</h1>
        <p className="text-muted-foreground font-light mb-8">Your cart is empty. Add a fragrance to continue.</p>
        <Link href="/categories">
          <Button className="rounded-full h-12 px-8 tracking-widest uppercase text-sm">Shop Collection</Button>
        </Link>
      </div>
    );
  }

  const setAddr = (k: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress((a) => ({ ...a, [k]: e.target.value }));

  /* Dummy checkout: any value is accepted, we only make sure the key fields aren't empty. */
  const goNext = () => {
    setError("");
    if (step === 0) {
      const missing = (["fullName", "phone", "line1", "city", "state", "pincode"] as const).filter(
        (k) => !address[k].trim(),
      );
      if (missing.length) {
        setError("Please fill in name, phone, address, city, state and pincode (any dummy values are fine).");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const paymentLabel = () => {
    switch (method) {
      case "upi":
        return upiId.trim() ? `UPI · ${upiId.trim()}` : "UPI";
      case "card": {
        const digits = card.number.replace(/\D/g, "");
        return digits.length >= 4 ? `Card · •••• ${digits.slice(-4)}` : "Credit / Debit Card";
      }
      case "netbanking":
        return `Net Banking · ${bank}`;
      default:
        return "Cash on Delivery";
    }
  };

  const confirmOrder = () => {
    setProcessing(true);
    window.setTimeout(() => {
      const now = new Date();
      const eta = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
      const order: Order = {
        id: `ARO${Math.floor(100000 + Math.random() * 900000)}`,
        placedAt: now.toISOString(),
        eta: eta.toISOString(),
        items: detailed.map(({ perfume, qty }) => ({
          id: perfume.id,
          name: perfume.name,
          brand: perfume.brand,
          imageUrl: perfume.imageUrl,
          price: perfume.actualprice,
          qty,
        })),
        address,
        paymentMethod: method,
        paymentLabel: paymentLabel(),
        subtotal,
        delivery,
        total,
      };
      placeOrder(order);
      navigate("/order-success");
    }, 1800);
  };

  const methods: { key: PaymentMethod; icon: typeof Smartphone; hint: string }[] = [
    { key: "upi", icon: Smartphone, hint: "Pay using any UPI app" },
    { key: "card", icon: CreditCard, hint: "Visa, Mastercard, RuPay" },
    { key: "netbanking", icon: Landmark, hint: "All major banks" },
    { key: "cod", icon: Banknote, hint: "Pay when it arrives" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2">Secure Checkout</p>
      <h1 className="font-serif text-4xl mb-6">Checkout</h1>

      <div className="mb-8 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground/80">
        <strong className="font-semibold">Demo checkout:</strong> no real payment is taken and no order is processed.
        You can enter any dummy details.
      </div>

      {/* Stepper */}
      <ol className="flex items-center gap-2 sm:gap-4 mb-10">
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s.key} className="flex items-center gap-2 sm:gap-4 flex-1 last:flex-none">
              <button
                type="button"
                disabled={i > step || processing}
                onClick={() => setStep(i)}
                className="flex items-center gap-2 disabled:cursor-default"
              >
                <span
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm border transition-colors",
                    done && "bg-primary text-primary-foreground border-primary",
                    active && "border-primary text-primary bg-primary/10",
                    !done && !active && "border-border text-muted-foreground",
                  )}
                >
                  {done ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </span>
                <span className={cn("hidden sm:inline text-sm tracking-wide", active ? "text-foreground font-medium" : "text-muted-foreground")}>
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
            </li>
          );
        })}
      </ol>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
        <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-8 shadow-sm">
          {/* STEP 1: ADDRESS */}
          {step === 0 && (
            <div>
              <h2 className="font-serif text-2xl mb-6">Delivery Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name *"><Input className={inputCls} value={address.fullName} onChange={setAddr("fullName")} placeholder="Your name" /></Field>
                <Field label="Phone *"><Input className={inputCls} value={address.phone} onChange={setAddr("phone")} placeholder="Phone number" inputMode="tel" /></Field>
                <Field label="Email" className="sm:col-span-2"><Input className={inputCls} value={address.email} onChange={setAddr("email")} placeholder="you@example.com" /></Field>
                <Field label="Address line 1 *" className="sm:col-span-2"><Input className={inputCls} value={address.line1} onChange={setAddr("line1")} placeholder="House no., street" /></Field>
                <Field label="Address line 2" className="sm:col-span-2"><Input className={inputCls} value={address.line2} onChange={setAddr("line2")} placeholder="Apartment, landmark (optional)" /></Field>
                <Field label="City *"><Input className={inputCls} value={address.city} onChange={setAddr("city")} placeholder="City" /></Field>
                <Field label="State *"><Input className={inputCls} value={address.state} onChange={setAddr("state")} placeholder="State" /></Field>
                <Field label="Pincode *"><Input className={inputCls} value={address.pincode} onChange={setAddr("pincode")} placeholder="Pincode" inputMode="numeric" /></Field>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 1 && (
            <div>
              <h2 className="font-serif text-2xl mb-6">Payment Method</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {methods.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMethod(m.key)}
                    className={cn(
                      "flex items-center gap-3 text-left rounded-xl border p-4 transition-colors",
                      method === m.key ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                    )}
                  >
                    <span className={cn("w-10 h-10 rounded-full flex items-center justify-center", method === m.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
                      <m.icon className="w-5 h-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{paymentNames[m.key]}</span>
                      <span className="block text-xs text-muted-foreground">{m.hint}</span>
                    </span>
                  </button>
                ))}
              </div>

              {method === "upi" && (
                <Field label="UPI ID"><Input className={inputCls} value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="name@upi" /></Field>
              )}
              {method === "card" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Card number" className="sm:col-span-2"><Input className={inputCls} value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="0000 0000 0000 0000" inputMode="numeric" /></Field>
                  <Field label="Name on card" className="sm:col-span-2"><Input className={inputCls} value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Name on card" /></Field>
                  <Field label="Expiry"><Input className={inputCls} value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM/YY" /></Field>
                  <Field label="CVV"><Input className={inputCls} type="password" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} placeholder="•••" /></Field>
                </div>
              )}
              {method === "netbanking" && (
                <Field label="Select your bank">
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {banks.map((b) => (<option key={b}>{b}</option>))}
                  </select>
                </Field>
              )}
              {method === "cod" && (
                <p className="text-sm text-muted-foreground font-light">
                  Pay in cash when your order is delivered. No extra charges for this demo.
                </p>
              )}
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 2 && (
            <div>
              <h2 className="font-serif text-2xl mb-6">Review &amp; Confirm</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="rounded-xl bg-secondary/30 border border-border/50 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Deliver to</p>
                    <button type="button" onClick={() => setStep(0)} className="text-xs text-primary hover:underline">Edit</button>
                  </div>
                  <p className="text-sm font-medium">{address.fullName}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {address.line1}{address.line2 ? `, ${address.line2}` : ""}<br />
                    {address.city}, {address.state} - {address.pincode}<br />
                    {address.phone}
                  </p>
                </div>
                <div className="rounded-xl bg-secondary/30 border border-border/50 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Payment</p>
                    <button type="button" onClick={() => setStep(1)} className="text-xs text-primary hover:underline">Edit</button>
                  </div>
                  <p className="text-sm font-medium">{paymentNames[method]}</p>
                  <p className="text-sm text-muted-foreground">{paymentLabel()}</p>
                </div>
              </div>

              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Items</p>
              <ul className="divide-y divide-border/50">
                {detailed.map(({ perfume, qty }) => (
                  <li key={perfume.id} className="flex items-center gap-4 py-3">
                    <img src={perfume.imageUrl} alt={perfume.name} className="w-14 h-16 rounded-lg object-cover bg-muted" />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif truncate">{perfume.name}</p>
                      <p className="text-xs text-muted-foreground">Qty {qty}</p>
                    </div>
                    <p className="text-sm font-medium">{formatINR(perfume.actualprice * qty)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && <p className="mt-5 text-sm text-destructive">{error}</p>}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <Button type="button" variant="outline" disabled={processing} onClick={() => setStep(step - 1)} className="rounded-full h-12 px-6 tracking-widest uppercase text-xs">
                Back
              </Button>
            ) : (
              <Link href="/cart" className="text-sm text-primary hover:text-accent">← Back to cart</Link>
            )}

            {step < 2 ? (
              <Button type="button" onClick={goNext} className="rounded-full h-12 px-8 tracking-widest uppercase text-xs sm:text-sm">
                {step === 0 ? "Continue to Payment" : "Review Order"}
              </Button>
            ) : (
              <Button type="button" disabled={processing} onClick={confirmOrder} className="rounded-full h-12 px-8 tracking-widest uppercase text-xs sm:text-sm">
                {processing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing payment…</>
                ) : (
                  <><Lock className="w-4 h-4" /> Place Order · {formatINR(total)}</>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 rounded-2xl border border-border/50 bg-secondary/30 p-6">
          <h2 className="font-serif text-2xl mb-5">Order Summary</h2>
          <ul className="space-y-3 mb-5">
            {detailed.map(({ perfume, qty }) => (
              <li key={perfume.id} className="flex items-center gap-3 text-sm">
                <img src={perfume.imageUrl} alt={perfume.name} className="w-12 h-14 rounded-md object-cover bg-muted" />
                <span className="flex-1 min-w-0 truncate">{perfume.name} <span className="text-muted-foreground">× {qty}</span></span>
                <span>{formatINR(perfume.actualprice * qty)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-sm border-t border-border/60 pt-4">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{delivery === 0 ? "Free" : formatINR(delivery)}</span></div>
            <div className="flex justify-between pt-2 text-base font-medium"><span>Total</span><span className="font-serif text-xl text-primary">{formatINR(total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
