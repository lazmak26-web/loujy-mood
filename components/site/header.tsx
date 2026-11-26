"use client";

import * as React from "react";
import gsap from "gsap";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "./cart";

const NAV = [
  { href: "#shop", label: "Shop" },
  { href: "#story", label: "Our story" },
  { href: "#care", label: "Care" },
  { href: "#newsletter", label: "Journal" },
];

export function Header() {
  const { items } = useCart();
  const [open, setOpen] = React.useState(false);
  const badgeRef = React.useRef<HTMLSpanElement>(null);

  // Bump the bag badge whenever something lands in it
  React.useEffect(() => {
    if (!badgeRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(badgeRef.current, { scale: 1.8 }, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  }, [items.length]);

  return (
    <header data-header className="sticky top-0 z-40 border-b border-transparent bg-background/80 backdrop-blur transition-[border-color,box-shadow] duration-300 data-[scrolled]:border-border/70 data-[scrolled]:shadow-[0_1px_12px_-6px_rgb(0_0_0/0.15)] supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="font-serif text-2xl tracking-tight">Riviera Clothes</a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
              <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px origin-right scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100 motion-reduce:transition-none" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" aria-label="Search" className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none">
            <Search className="size-[18px]" />
          </button>
          <a id="bag-button" href="#shop" aria-label={`Bag, ${items.length} item${items.length === 1 ? "" : "s"}`} className="relative inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none">
            <ShoppingBag className="size-[18px]" />
            {items.length > 0 && (
              <span ref={badgeRef} className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium leading-4 text-background tabular-nums">
                {items.length}
              </span>
            )}
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring outline-none md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border px-4 py-3 md:hidden">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-base hover:bg-accent">
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
