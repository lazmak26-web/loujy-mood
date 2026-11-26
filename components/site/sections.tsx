import { Droplets, Leaf, RotateCcw, Scissors, Sparkle, Sun, Truck, Wind } from "lucide-react";
import { Newsletter } from "./newsletter";

export function Perks() {
  const perks = [
    { icon: Truck, title: "Free shipping", body: "On orders over 500 DH." },
    { icon: RotateCcw, title: "30-day returns", body: "Wear it, wash it, still send it back." },
    { icon: Leaf, title: "Organic fibres", body: "Cotton and wool traced to the farm." },
  ];
  return (
    <section aria-label="Why shop with us" className="border-y border-border bg-secondary/60">
      <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
        {perks.map(({ icon: Icon, title, body }) => (
          <li key={title} data-reveal className="flex items-center gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Story() {
  const stats = [
    { value: 3, suffix: "", label: "tees this drop" },
    { value: 3, suffix: "", label: "partner mills" },
    { value: 100, suffix: "%", label: "traceable fibre" },
  ];
  return (
    <section id="story" aria-labelledby="story-heading" className="scroll-mt-20 bg-foreground py-20 text-background sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-background/60">Our story</p>
          <h2 id="story-heading" data-split className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Fewer pieces. Better cloth. A rail you can walk along.
          </h2>
        </div>
        <div className="space-y-6 text-base leading-relaxed text-background/75">
          <p data-reveal>
            Riviera Clothes started as one rail in a shared studio: a handful of tees we couldn&apos;t stop wearing. We still work that way. Each drop we hang a few pieces, and only a few.
          </p>
          <p data-reveal>
            Every garment is cut by small mills we visit in person, from fibres we can trace. No seasonal sales, no
            landfill stock. If something doesn&apos;t sell, we make less of it next time.
          </p>
          <dl data-reveal className="grid grid-cols-3 gap-4 border-t border-background/15 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd data-count={s.value} data-suffix={s.suffix} className="font-serif text-4xl tabular-nums text-background sm:text-5xl">
                  {s.value}
                  {s.suffix}
                </dd>
                <dd className="mt-1 text-sm text-background/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Care() {
  const steps = [
    { icon: Droplets, title: "Wash cold", body: "30°C, inside out, with similar colours. Fibres last longer and prints stay sharp." },
    { icon: Wind, title: "Dry flat", body: "Skip the tumble dryer. Knits keep their shape when laid out on a towel." },
    { icon: Sun, title: "Air between wears", body: "Wool cleans itself with a night by an open window. Wash it less." },
    { icon: Scissors, title: "Free repairs", body: "Loose button or a split seam? Send it in and we fix it, for life." },
  ];
  return (
    <section id="care" aria-labelledby="care-heading" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Care guide</p>
          <h2 id="care-heading" data-split className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Look after it, and it looks after you.
          </h2>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, body }) => (
            <li key={title} data-reveal className="bg-card p-6 text-card-foreground sm:p-8">
              <Icon className="size-6" aria-hidden="true" />
              <h3 className="mt-6 font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className="scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28">
      <div data-reveal className="mx-auto max-w-7xl rounded-3xl bg-secondary px-6 py-14 sm:px-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 id="newsletter-heading" data-split className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              Hear when the next rail goes up.
            </h2>
            <p className="mt-3 text-muted-foreground">One email per drop. New pieces, nothing else.</p>
          </div>
          <Newsletter />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { title: "Shop", links: ["New drop", "Tees", "Gift card"] },
    { title: "Help", links: ["Shipping", "Returns", "Size guide", "Repairs", "Contact"] },
    { title: "Riviera Clothes", links: ["Our story", "Mills", "Journal", "Stockists"] },
  ];
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="font-serif text-2xl">Riviera Clothes</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Small-batch clothing, hung a few pieces at a time.</p>
        </div>
        {cols.map((col) => (
          <nav key={col.title} aria-label={col.title} data-reveal>
            <p className="text-sm font-medium">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#top" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6">© {new Date().getFullYear()} Riviera Clothes. All rights reserved.</p>
      </div>
    </footer>
  );
}

const MARQUEE_WORDS = ["Riviera Clothes", "New drop", "Oversized tees", "Acid wash", "Free shipping over 500 DH", "Raglan piping", "Metal logo"];

/** Endless ticker; GSAP speeds it up with scroll velocity (see page-motion.tsx). */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {MARQUEE_WORDS.map((w) => (
        <li key={w} className="flex items-center gap-8 pr-8 font-serif text-4xl tracking-tight sm:text-6xl">
          {w}
          <Sparkle className="size-5 shrink-0 text-muted-foreground sm:size-7" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Highlights" className="overflow-hidden border-b border-border py-8 sm:py-10">
      <div data-marquee className="flex w-max will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
