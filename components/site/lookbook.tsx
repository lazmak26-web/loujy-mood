"use client";

import * as React from "react";
import FlexCarousel, { type FlexCarouselItem } from "@/components/ui/flex-carousel";

const LOOKS: FlexCarouselItem[] = [
  { src: "/lookbook/washed-hoodie-black.webp", alt: "Sun-faded black hoodie", title: "Washed hoodie", subtitle: "Faded black" },
  { src: "/lookbook/zip-hoodie-grey.webp", alt: "Heather grey zip hoodie", title: "Zip hoodie", subtitle: "Heather grey" },
  { src: "/lookbook/graphic-knit-grey.webp", alt: "Grey and black graphic knit sweater", title: "Graphic knit", subtitle: "Grey / black" },
  { src: "/lookbook/wide-jeans-grey.webp", alt: "Grey wash wide-leg jeans", title: "Wide-leg jeans", subtitle: "Grey wash" },
  { src: "/lookbook/suede-sneakers-black.webp", alt: "Black suede sneakers with chunky white laces", title: "Suede sneakers", subtitle: "Black / white" },
];

/** WebGL lookbook carousel: drag or swipe sideways, click a card to open it. */
export function Lookbook() {
  // Phones: smaller cards so several stay in view, like on desktop.
  const [narrow, setNarrow] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="lookbook" aria-labelledby="lookbook-heading" className="scroll-mt-20 pt-6 sm:pt-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">New arrivals</p>
          <h2 id="lookbook-heading" data-split className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            The rest of the look.
          </h2>
        </div>
        <p data-reveal className="max-w-sm text-sm text-muted-foreground">
          Hoodies, knits, denim and sneakers. Drag sideways to browse, tap a piece to open it.
        </p>
      </div>
      <div className="mt-2 h-[58svh] min-h-[400px] max-h-[820px] w-full sm:mt-6 sm:h-[78svh] sm:min-h-[460px]">
        <FlexCarousel
          items={LOOKS}
          preset="liquid"
          intro="rise"
          key={narrow ? "narrow" : "wide"}
          cardHeight={narrow ? 0.5 : 0.55}
          gap={14}
          radius={14}
          // Leave vertical wheel scrolling to the page; sideways swipes still move the carousel.
          captureWheel={false}
          // Always gliding, slowly: about one card every 7 seconds.
          drift={0.14}
          className="text-foreground"
        />
      </div>
    </section>
  );
}
