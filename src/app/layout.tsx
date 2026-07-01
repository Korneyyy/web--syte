import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Preloader } from "@/components/layout/preloader";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { FloatingTelegram } from "@/components/layout/floating-telegram";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { JsonLd } from "@/components/layout/json-ld";
import "./globals.css";
import Starfield from "@/components/layout/Starfield"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Websyte — Разработка сайтов на заказ",
  description:
    "Создаю современные сайты и веб-приложения под ключ. Лендинги, корпоративные сайты, интернет-магазины.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Websyte — Разработка сайтов на заказ",
    description:
      "Создаю современные сайты и веб-приложения под ключ. Лендинги, корпоративные сайты, интернет-магазины.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen bg-dark text-light antialiased font-sans">
        <Preloader />
        <JsonLd />
        <Starfield />
        {children}
        <ScrollToTop />
        <FloatingTelegram />
        <CookieBanner />
      </body>
    </html>
  );
}