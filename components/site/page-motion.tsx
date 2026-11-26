"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Page-wide scroll choreography, driven by data attributes:
 *  data-split    heading revealed line by line
 *  data-reveal   element fades up when it enters the viewport (siblings stagger)
 *  data-parallax element drifts slightly while its parent scrolls past
 *  data-count    number counts up from 0 when it enters
 */
export function PageMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hero entrance
      const hero = document.querySelector("[data-slot='clothing-rail-hero']");
      if (hero) {
        gsap.fromTo(hero, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.1 });
      }

      // Headings: line-by-line masked reveal
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1,
              stagger: 0.09,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
      });

      // Fade-up reveals, batched so items entering together stagger
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", overwrite: true }),
      });

      // Gentle parallax inside product images
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Count-up stats
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(state.v)}${suffix}`;
          },
        });
      });

      // Marquee: endless loop that speeds up and flips with scroll velocity
      const track = document.querySelector<HTMLElement>("[data-marquee]");
      if (track) {
        const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        let direction = 1;
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate(self) {
            if (self.direction !== direction) direction = self.direction;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
            gsap.to(loop, { timeScale: direction * boost, duration: 0.25, overwrite: true });
            gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.25, ease: "power2.out" });
          },
        });
      }

      // Header hides while scrolling down, comes back on the way up
      const header = document.querySelector<HTMLElement>("[data-header]");
      if (header) {
        const show = gsap.to(header, { yPercent: -100, duration: 0.35, ease: "power2.out", paused: true }).reverse();
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate(self) {
            const hide = self.direction === 1 && self.scroll() > 160 && !header.contains(document.activeElement);
            show.reversed(!hide);
            header.toggleAttribute("data-scrolled", self.scroll() > 8);
          },
        });
      }
    });

    // Everything visible immediately for reduced motion
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-reveal], [data-split], [data-slot='clothing-rail-hero']", { autoAlpha: 1, y: 0, visibility: "visible" });
    });
  });

  return null;
}
