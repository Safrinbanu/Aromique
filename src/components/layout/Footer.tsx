import { Link } from "wouter";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logoImg from "../layout/logo.png";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 border-t border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-8 group">
              <img src={logoImg} alt={`${siteConfig.name} Logo`} className="h-14 w-auto transition-transform duration-500 group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="font-serif text-4xl font-semibold tracking-[0.2em] text-background leading-none">
                  {siteConfig.nameLine1}
                </span>
                <span className="font-sans text-[10px] tracking-[0.55em] text-accent font-medium mt-2">
                  {siteConfig.nameLine2}
                </span>
              </div>
            </Link>
            <p className="text-muted text-sm max-w-sm font-light leading-relaxed">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">Explore</h4>
            <ul className="space-y-3 text-sm font-light text-muted">
              <li><Link href="/categories" className="hover:text-background transition-colors">Our Collection</Link></li>
              <li><Link href="/categories?gender=Women" className="hover:text-background transition-colors">For Her</Link></li>
              <li><Link href="/contact" className="hover:text-background transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-background transition-colors">Our Story</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-4 text-accent">Contact</h4>
            <ul className="space-y-3 text-sm font-light text-muted">
              <li>{siteConfig.email}</li>
              <li className="pt-4 flex gap-4">
                <a href="#" className="hover:text-background transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-background transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-background transition-colors" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-background/10 text-center text-xs text-muted font-light">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
