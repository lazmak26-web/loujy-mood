"use client";

import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { PRODUCTS } from "@/lib/products";
import { useLenis } from "./smooth-scroll";

export function Hero() {
  const lenis = useLenis();
  return (
    <ClothingRailHero
      items={PRODUCTS}
      hanger="wood"
      autoplay
      eyebrow="New drop · Three tees on the rail"
      heading="Pick it off the rail. Wear it out."
      caption="Brush along the rail, slide a hanger, tap a tee to take a closer look."
      className="py-10 sm:py-16"
      // Pause smooth scrolling while the detail view is open so the wheel doesn't move the page behind it.
      onOpenChange={(index) => (index === null ? lenis?.start() : lenis?.stop())}
      action={
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#shop"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            Shop the drop
          </a>
          <a
            href="#story"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          >
            Our story
          </a>
        </div>
      }
    />
  );
}
