import { CartProvider } from "@/components/site/cart";
import { Header } from "@/components/site/header";
import { Lookbook } from "@/components/site/lookbook";
import { Hero } from "@/components/site/hero";
import { PageMotion } from "@/components/site/page-motion";
import { ProductGrid } from "@/components/site/product-grid";
import { Care, Footer, Marquee, NewsletterSection, Perks, Story } from "@/components/site/sections";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <SmoothScroll>
      <CartProvider>
        <div id="top" className="flex min-h-svh flex-col">
          <Header />
          <main className="flex-1">
            <Hero />
            <Lookbook />
            <Perks />
            <Marquee />
            <ProductGrid products={PRODUCTS} />
            <Story />
            <Care />
            <NewsletterSection />
          </main>
          <Footer />
        </div>
        <PageMotion />
      </CartProvider>
    </SmoothScroll>
  );
}
