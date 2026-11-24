"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface RailGarment {
  id: string;
  /** Accessible name, caption and detail title. */
  name: string;
  description?: string;
  /** Front photo: a transparent cut-out on a portrait canvas. */
  image: string;
  /** Back photo; the front photo is reused when omitted. */
  backImage?: string;
  /** Short hang-tag text such as a price, a size or "sur mesure". */
  tag?: string;
  /** Short facts listed in the detail view. */
  details?: string[];
}

export interface ClothingRailHeroLabels {
  front: string;
  back: string;
  close: string;
  show: string;
}

export interface ClothingRailHeroProps
  extends Omit<React.ComponentProps<"section">, "children"> {
  items: RailGarment[];
  eyebrow?: string;
  heading?: string;
  /** Shown under the rail while nothing is turned to the front. */
  caption?: string;
  /** Call to action rendered under the caption and in the detail view. */
  action?: React.ReactNode;
  /** Turns the pieces to the front one by one until the visitor interacts. */
  autoplay?: boolean;
  /** Milliseconds each piece faces the front during autoplay. */
  interval?: number;
  labels?: ClothingRailHeroLabels;
  onOpenChange?: (index: number | null) => void;
}

const DEFAULT_LABELS: ClothingRailHeroLabels = {
  front: "Front",
  back: "Back",
  close: "Close",
  show: "Show",
};

/** Resting angle of a piece that is not facing the visitor. */
const REST = -62;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function Hanger() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 46"
      className="pointer-events-none absolute left-1/2 top-0 z-10 w-[62%] -translate-x-1/2"
    >
      <path
        d="M60,4 C54,4 52,10 56,13 C59,15 60,17 60,21"
        fill="none"
        stroke="var(--rail-metal, #b8975a)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M60,21 L8,40 C4,42 5,45 9,45 L111,45 C115,45 116,42 112,40 Z"
        fill="var(--rail-wood, #7a4a26)"
        stroke="rgba(0,0,0,.25)"
        strokeWidth=".8"
      />
      <path d="M14,41 L106,41" stroke="rgba(255,255,255,.22)" strokeWidth="1.2" />
    </svg>
  );
}

export function ClothingRailHero({
  items,
  eyebrow,
  heading,
  caption,
  action,
  autoplay = true,
  interval = 3200,
  labels = DEFAULT_LABELS,
  onOpenChange,
  className,
  ...props
}: ClothingRailHeroProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState<number | null>(null);
  const [touched, setTouched] = React.useState(false);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (!autoplay || touched || reduced || items.length === 0) return;
    const id = window.setInterval(() => {
      setActive((i) => (i === null ? 0 : (i + 1) % items.length));
    }, interval);
    return () => window.clearInterval(id);
  }, [autoplay, touched, reduced, interval, items.length]);

  const openPiece = React.useCallback(
    (index: number | null) => {
      setOpen(index);
      onOpenChange?.(index);
    },
    [onOpenChange],
  );

  const current = active === null ? null : items[active];

  return (
    <section
      className={cn("relative w-full", className)}
      aria-roledescription="carousel"
      {...props}
    >
      {(eyebrow || heading) && (
        <header className="mx-auto mb-8 max-w-2xl px-4 text-center">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--rail-accent,#b8975a)]">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{heading}</h2>
          )}
        </header>
      )}

      {/* Rail */}
      <div className="relative mx-auto max-w-6xl px-2 sm:px-6">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[6px] z-0 mx-2 h-[9px] rounded-full sm:mx-6"
          style={{
            background:
              "linear-gradient(180deg,#f3dfa8 0%,#c9a24f 40%,#8a6a2a 100%)",
            boxShadow: "0 4px 10px rgba(0,0,0,.25)",
          }}
        />
        <ul
          className="relative z-[1] flex snap-x snap-mandatory justify-start gap-1 overflow-x-auto pb-4 pt-0 [scrollbar-width:none] sm:justify-center sm:overflow-visible"
          style={{ perspective: 1100 }}
          onMouseLeave={() => !touched && setActive(null)}
        >
          {items.map((item, i) => {
            const facing = active === i;
            return (
              <li
                key={item.id}
                className="relative shrink-0 snap-center"
                style={{
                  width: facing ? "min(52vw, 230px)" : "min(26vw, 118px)",
                  transition: "width 700ms cubic-bezier(.2,.8,.2,1)",
                  zIndex: facing ? 5 : 1,
                }}
              >
                <button
                  type="button"
                  aria-label={`${labels.show} ${item.name}`}
                  aria-pressed={facing}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => {
                    setTouched(true);
                    setActive(i);
                  }}
                  onClick={() => {
                    setTouched(true);
                    if (facing) openPiece(i);
                    else setActive(i);
                  }}
                  className="group relative block w-full cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--rail-accent,#b8975a)] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                >
                  <div
                    className="relative origin-top"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${facing ? 0 : REST}deg)`,
                      transition: reduced
                        ? "none"
                        : "transform 900ms cubic-bezier(.2,.8,.2,1)",
                      animation:
                        facing && !reduced
                          ? "rail-sway 3.6s ease-in-out infinite"
                          : undefined,
                    }}
                  >
                    <Hanger />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt=""
                      draggable={false}
                      className="relative mt-[6%] block w-[min(52vw,230px)] max-w-none select-none"
                      style={{
                        marginLeft: facing ? 0 : "calc((min(26vw,118px) - min(52vw,230px)) / 2)",
                        transition: "margin 700ms cubic-bezier(.2,.8,.2,1), filter 700ms",
                        filter: facing
                          ? "drop-shadow(0 22px 22px rgba(0,0,0,.28))"
                          : "brightness(.78) drop-shadow(0 10px 12px rgba(0,0,0,.25))",
                      }}
                    />
                  </div>
                  {item.tag && (
                    <span
                      className="absolute right-[8%] top-[16%] origin-top rotate-6 rounded-sm bg-[var(--rail-tag,#f6ecd6)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3a2a17] shadow transition-opacity duration-500"
                      style={{ opacity: facing ? 1 : 0 }}
                    >
                      {item.tag}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mx-auto mt-4 max-w-xl px-4 text-center" aria-live="polite">
        {current ? (
          <>
            <p className="font-display text-2xl">{current.name}</p>
            {current.description && (
              <p className="mt-2 text-sm opacity-75">{current.description}</p>
            )}
            <button
              type="button"
              onClick={() => active !== null && openPiece(active)}
              className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] underline decoration-[var(--rail-accent,#b8975a)] decoration-2 underline-offset-8"
            >
              {labels.show}
            </button>
          </>
        ) : (
          <>
            {caption && <p className="text-sm opacity-75">{caption}</p>}
            {action && <div className="mt-6 flex justify-center">{action}</div>}
          </>
        )}
      </div>

      {open !== null && (
        <DetailDialog
          item={items[open]}
          labels={labels}
          action={action}
          onClose={() => openPiece(null)}
        />
      )}

      <style>{`@keyframes rail-sway{0%,100%{transform:rotateY(0deg) rotateZ(-.6deg)}50%{transform:rotateY(4deg) rotateZ(.6deg)}}`}</style>
    </section>
  );
}

function DetailDialog({
  item,
  labels,
  action,
  onClose,
}: {
  item: RailGarment;
  labels: ClothingRailHeroLabels;
  action?: React.ReactNode;
  onClose: () => void;
}) {
  const [side, setSide] = React.useState<"front" | "back">("front");
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[92dvh] w-full max-w-3xl overflow-auto rounded-t-2xl bg-[var(--dialog-bg,#fbf6ec)] text-[var(--dialog-fg,#2a1d12)] shadow-2xl sm:grid-cols-2 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center justify-center bg-[var(--dialog-media,#efe3cb)] p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={side === "back" && item.backImage ? item.backImage : item.image}
            alt={item.name}
            className="max-h-[52dvh] w-auto"
            style={{ transform: side === "back" && !item.backImage ? "scaleX(-1)" : undefined }}
          />
          {item.backImage && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-white/80 p-1 text-xs">
              {(["front", "back"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSide(s)}
                  aria-pressed={side === s}
                  className={cn(
                    "rounded-full px-3 py-1",
                    side === s && "bg-[#2a1d12] text-white",
                  )}
                >
                  {labels[s]}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="self-end text-xs font-semibold uppercase tracking-[0.2em] opacity-70 hover:opacity-100"
          >
            {labels.close} ✕
          </button>
          {item.tag && (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--rail-accent,#b8975a)]">
              {item.tag}
            </p>
          )}
          <h3 className="font-display text-3xl leading-tight">{item.name}</h3>
          {item.description && <p className="text-sm leading-relaxed opacity-80">{item.description}</p>}
          {item.details && item.details.length > 0 && (
            <ul className="space-y-2 border-t border-black/10 pt-4 text-sm">
              {item.details.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden="true" className="text-[var(--rail-accent,#b8975a)]">✦</span>
                  {d}
                </li>
              ))}
            </ul>
          )}
          {action && (
            <div
              className="mt-auto pt-2"
              onClickCapture={(e) => {
                const a = (e.target as HTMLElement).closest("a");
                if (a?.getAttribute("href")?.startsWith("#")) onClose();
              }}
            >
              {action}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ClothingRailHero;
