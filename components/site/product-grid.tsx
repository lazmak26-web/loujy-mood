"use client";

import * as React from "react";
import gsap from "gsap";
import { Check, Plus, Shirt } from "lucide-react";
import type { RailGarment } from "@/components/ui/product-rail-gallery";
import { useCart } from "./cart";

export function ProductGrid({ products }: { products: RailGarment[] }) {

  return (
    <section id="shop" aria-labelledby="shop-heading" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">The edit</p>
            <h2 id="shop-heading" data-split className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              Three tees, made to be worn hard.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-sm text-muted-foreground">Oversized cuts, washed fabrics, prints that age with you.</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-x-4 sm:grid-cols-2 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Clones the product photo and flies it into the bag icon, then calls done. */
function flyToBag(from: HTMLElement | null, done: () => void) {
  const bag = document.getElementById("bag-button");
  if (!from || !bag || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
  const a = from.getBoundingClientRect();
  const b = bag.getBoundingClientRect();
  const ghost = from.cloneNode(true) as HTMLElement;
  Object.assign(ghost.style, {
    position: "fixed", left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px`,
    margin: "0", padding: "0", zIndex: "60", pointerEvents: "none", opacity: "1",
  });
  document.body.appendChild(ghost);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  gsap.timeline({ onComplete: () => { ghost.remove(); done(); } })
    .to(ghost, { x: dx, duration: 0.75, ease: "power2.inOut" }, 0)
    .to(ghost, { y: dy, duration: 0.75, ease: "back.in(1.4)" }, 0)
    .to(ghost, { scale: 0.08, rotate: 12, duration: 0.75, ease: "power2.in" }, 0)
    .to(ghost, { autoAlpha: 0, duration: 0.15 }, 0.6);
}

function ProductCard({ product }: { product: RailGarment }) {
  const { items, add } = useCart();
  const [failed, setFailed] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const inBag = items.filter((id) => id === product.id).length;

  React.useEffect(() => {
    if (!justAdded) return;
    const t = window.setTimeout(() => setJustAdded(false), 1400);
    return () => window.clearTimeout(t);
  }, [justAdded]);

  // Subtle 3D tilt that follows the pointer (mouse only)
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !cardRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(cardRef.current, { rotateY: px * 8, rotateX: -py * 8, duration: 0.6, ease: "power3.out", transformPerspective: 900 });
  };
  const onPointerLeave = () => {
    if (cardRef.current) gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
  };

  const [name, variant] = product.name.split(" · ");

  return (
    <li data-reveal className="group">
      <div
        ref={cardRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary will-change-transform"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-[18%] bottom-[10%] top-[14%] rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: product.color }}
        />
        {product.image && !failed ? (
          <div data-parallax className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={product.image}
              alt={product.name}
              loading="lazy"
              onError={() => setFailed(true)}
              className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
            />
          </div>
        ) : (
          <div className="relative flex h-full items-center justify-center">
            <Shirt className="size-24 stroke-[1.2]" style={{ color: product.color }} aria-label={product.name} />
          </div>
        )}
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium tabular-nums shadow-sm">
            {product.tag}
          </span>
        )}
        <button
          type="button"
          onClick={() =>
            flyToBag(imgRef.current, () => {
              add(product.id);
              setJustAdded(true);
            })
          }
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full bg-foreground text-background shadow-md outline-none transition-transform hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
        >
          {justAdded ? <Check className="size-4" /> : <Plus className="size-4" />}
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium">{name}</h3>
          {variant && <p className="text-sm text-muted-foreground">{variant}</p>}
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
          <span aria-hidden="true" className="size-3 rounded-full ring-1 ring-black/10" style={{ background: product.color }} />
          {inBag > 0 ? `${inBag} in bag` : null}
        </span>
      </div>
      {product.description && <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>}
    </li>
  );
}
