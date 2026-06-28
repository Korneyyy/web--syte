const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Websyte",
  url: "https://web-syte-five.vercel.app",
  description:
    "Создаю современные сайты и веб-приложения под ключ. Лендинги, корпоративные сайты, интернет-магазины.",
  inLanguage: "ru",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
