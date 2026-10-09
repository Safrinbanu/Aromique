import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { perfumes, type Perfume } from "./data";

/* ---------- Constants (dummy store rules) ---------- */
export const FREE_DELIVERY_ABOVE = 999;
export const DELIVERY_FEE = 99;

/* ---------- Types ---------- */
export type CartLine = { id: string; qty: number };

export type Address = {
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

export type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

export type Order = {
  id: string;
  placedAt: string; // ISO
  eta: string; // ISO
  items: { id: string; name: string; brand: string; imageUrl: string; price: number; qty: number }[];
  address: Address;
  paymentMethod: PaymentMethod;
  paymentLabel: string;
  subtotal: number;
  delivery: number;
  total: number;
};

export const paymentNames: Record<PaymentMethod, string> = {
  upi: "UPI",
  card: "Credit / Debit Card",
  netbanking: "Net Banking",
  cod: "Cash on Delivery",
};

/* ---------- Helpers ---------- */
export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function calcTotals(lines: { price: number; qty: number }[]) {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  return { subtotal, delivery, total: subtotal + delivery };
}

const CART_KEY = "aromique-cart";
const ORDER_KEY = "aromique-last-order";

function safeLoad<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSave(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

/* ---------- Context ---------- */
type CartContextValue = {
  lines: CartLine[];
  detailed: { perfume: Perfume; qty: number }[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  lastOrder: Order | null;
  placeOrder: (order: Order) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => safeLoad<CartLine[]>(CART_KEY, []));
  const [lastOrder, setLastOrder] = useState<Order | null>(() => safeLoad<Order | null>(ORDER_KEY, null));

  useEffect(() => {
    safeSave(CART_KEY, lines);
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = lines
      .map((l) => ({ perfume: perfumes.find((p) => p.id === l.id), qty: l.qty }))
      .filter((x): x is { perfume: Perfume; qty: number } => !!x.perfume);

    const { subtotal, delivery, total } = calcTotals(
      detailed.map((d) => ({ price: d.perfume.actualprice, qty: d.qty })),
    );

    return {
      lines,
      detailed,
      count: detailed.reduce((n, d) => n + d.qty, 0),
      subtotal,
      delivery,
      total,
      add: (id, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.id === id);
          return found
            ? prev.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, 10) } : l))
            : [...prev, { id, qty }];
        }),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 10) } : l)),
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
      lastOrder,
      placeOrder: (order) => {
        safeSave(ORDER_KEY, order);
        setLastOrder(order);
        setLines([]);
      },
    };
  }, [lines, lastOrder]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
