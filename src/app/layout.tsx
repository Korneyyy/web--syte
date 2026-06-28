import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
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
  openGraph: {
    title: "Websyte — Разработка сайтов на заказ",
    description:
      "Создаю современные сайты и веб-приложения под ключ. Лендинги, корпоративные сайты, интернет-магазины.",
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
        {children}
      </body>
    </html>
  );
}