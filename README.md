# Riviera Clothes

Clothing store landing page built with Next.js 15, Tailwind CSS v4, TypeScript and a shadcn-style structure.
Smooth scrolling uses Lenis and scroll animations use GSAP (`components/site/smooth-scroll.tsx`, `components/site/page-motion.tsx`).
The hero is an interactive clothing rail (`components/ui/product-rail-gallery.tsx`).

## Edit products

Names, prices and descriptions live in `lib/products.ts`. Product photos go in `public/products/`
(transparent cut-outs on a 200 × 310 portrait canvas work best).

## Run locally

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

`npm start` listens on `$PORT` (Railway sets it automatically).
