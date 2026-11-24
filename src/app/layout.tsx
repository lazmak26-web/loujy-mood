import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});
const body = Jost({ variable: "--font-body", subsets: ["latin"] });
const amiri = Amiri({ variable: "--font-amiri", subsets: ["arabic", "latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Loujy Mood — Caftans marocains pour vos occasions",
  description:
    "Caftans et tenues traditionnelles marocaines pour mariages, henné, Aïd et soirées. Tradition, savoir-faire et élégance.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${body.variable} ${amiri.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
