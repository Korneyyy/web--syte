import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Preloader } from "@/components/layout/preloader";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { FloatingTelegram } from "@/components/layout/floating-telegram";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { JsonLd } from "@/components/layout/json-ld";
import DynamicStarfield from "@/components/layout/DynamicStarfield";
import "./globals.css";

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
  metadataBase: new URL("https://web-syte-five.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Websyte — Разработка сайтов на заказ",
    description:
      "Создаю современные сайты и веб-приложения под ключ. Лендинги, корпоративные сайты, интернет-магазины.",
    url: "https://web-syte-five.vercel.app",
    siteName: "Websyte",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Websyte — Разработка сайтов",
      },
    ],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Websyte — Разработка сайтов на заказ",
    description:
      "Создаю современные сайты и веб-приложения под ключ. Лендинги, корпоративные сайты, интернет-магазины.",
    images: ["/og.webp"],
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
      className={`${inter.variable} ${manrope.variable} overflow-x-hidden`}
    >
      <body className="min-h-screen bg-dark text-light antialiased font-sans overflow-x-hidden">
        <Preloader />
        <JsonLd />
        <DynamicStarfield />
        {children}
        <ScrollToTop />
        <FloatingTelegram />
        <CookieBanner />
      </body>
    </html>
  );
}