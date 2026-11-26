import type { RailGarment } from "@/components/ui/product-rail-gallery";

/** Edit names, prices and details here. Images live in /public/products. */
export const PRODUCTS: RailGarment[] = [
  {
    id: "raglan-piping-black",
    name: "Raglan piping tee · Black",
    kind: "tee",
    color: "#111111",
    trim: "#F4F4F4",
    tag: "249 DH",
    description: "Black raglan tee with contrast white piping that runs from the collar down both sides.",
    details: ["Heavy cotton", "Raglan sleeves", "Contrast piping"],
    image: "/products/raglan-piping-black.webp",
  },
  {
    id: "metal-logo-grey",
    name: "Metal logo tee · Washed grey",
    kind: "tee",
    color: "#5E5C5E",
    tag: "279 DH",
    description: "Faded grey tee with a soft suede-like hand and a jagged black metal logo across the chest.",
    details: ["Oversized fit", "Drop shoulder", "Suede-touch fabric"],
    image: "/products/metal-logo-grey.webp",
  },
  {
    id: "spider-acid-wash",
    name: "Spider tee · Acid wash",
    kind: "tee",
    color: "#2E2E2E",
    tag: "279 DH",
    description: "Acid-washed black tee with a chalky spider print crawling over the chest.",
    details: ["Acid wash", "Oversized fit", "Chest print"],
    image: "/products/spider-acid-wash.webp",
  },
];
