import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logoImg from "../../assets/images/logo.png";
import { siteConfig } from "@/lib/siteConfig";
export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { count } = useCart();

  const links = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Collection" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
<img
  src={logoImg}
  alt={`${siteConfig.name} Logo`}
  className="h-14 w-auto transition-transform duration-500 group-hover:rotate-6"
/>              <div className="flex flex-col">
                <span className="font-serif text-3xl font-semibold tracking-[0.18em] text-foreground leading-none">
                  {siteConfig.nameLine1}
                </span>
                <span className="font-sans text-[9px] tracking-[0.5em] text-accent font-medium mt-1.5">
                  {siteConfig.nameLine2}
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium tracking-wide rounded-full transition-colors hover:text-primary hover:bg-primary/5 relative",
                    location === link.href ? "text-primary bg-primary/10" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors" aria-label="Cart" data-testid="link-cart">
              <ShoppingBag className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary p-2"
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border/50 animate-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-3 text-base font-medium transition-colors",
                  location === link.href 
                    ? "text-primary bg-primary/5" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
