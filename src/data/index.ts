import type { Service, PortfolioItem, Review, FaqItem } from "@/types";

export const services: Service[] = [
  {
    id: "landing",
    title: "Лендинг",
    description: "Одностраничный сайт для презентации продукта или услуги. Высокая конверсия и современный дизайн.",
    features: ["Уникальный дизайн", "Адаптивная верстка", "SEO-оптимизация", "Скорость загрузки 95+"],
    icon: "Layout",
    image: "/service-landing.webp",
  },
  {
    id: "corporate",
    title: "Корпоративный сайт",
    description: "Многостраничный сайт для бизнеса с каталогом услуг, новостями и контактами.",
    features: ["Каталог услуг", "Блог/Новости", "Форма обратной связи", "Панель управления"],
    icon: "Building2",
    image: "/service-corporate.webp",
  },
  {
    id: "ecommerce",
    title: "Интернет-магазин",
    description: "Полноценный интернет-магазин с корзиной, оплатой и личным кабинетом.",
    features: ["Каталог товаров", "Корзина и оплата", "Личный кабинет", "Админ-панель"],
    icon: "ShoppingCart",
    image: "/service-ecommerce.webp",
  },
  {
    id: "webapp",
    title: "Веб-приложение",
    description: "Сложное веб-приложение с авторизацией, базой данных и реальным временем.",
    features: ["Авторизация", "База данных", "Real-time", "API интеграции"],
    icon: "AppWindow",
    image: "/service-webapp.webp",
  },
  {
    id: "redesign",
    title: "Доработка сайта",
    description: "Модернизация существующего сайта: редизайн, новый функционал, оптимизация.",
    features: ["Редизайн", "Новый функционал", "Оптимизация", "Аудит"],
    icon: "RefreshCw",
    image: "/service-redesign.webp",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "project-1",
    title: "CloudStore",
    description: "Интернет-магазин цифровых товаров",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    image: "/portfolio-1.webp",
    link: "#",
  },
  {
    id: "project-2",
    title: "TaskFlow",
    description: "Корпоративный таск-трекер",
    technologies: ["React", "Node.js", "MongoDB", "WebSocket"],
    image: "/portfolio-2.webp",
    link: "#",
  },
  {
    id: "project-3",
    title: "BrandUp",
    description: "Лендинг для digital-агентства",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    image: "/portfolio-3.webp",
    link: "#",
  },
  {
    id: "project-4",
    title: "FitLife",
    description: "Веб-приложение для фитнес-клуба",
    technologies: ["React", "Express", "PostgreSQL", "Docker"],
    image: "/portfolio-4.webp",
    link: "#",
  },
  {
    id: "project-5",
    title: "EcoTrack",
    description: "Панель мониторинга экологии",
    technologies: ["TypeScript", "Next.js", "D3.js", "Prisma"],
    image: "/portfolio-5.webp",
    link: "#",
  },
  {
    id: "project-6",
    title: "ChatHub",
    description: "Корпоративный мессенджер",
    technologies: ["React", "Node.js", "Socket.io", "Redis"],
    image: "/portfolio-6.webp",
    link: "#",
  },
];

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Алексей Иванов",
    role: "CEO, CloudStore",
    text: "Команда профессионалов! Сделали интернет-магазин за 2 недели. Результат превзошёл ожидания. Рекомендую!",
    avatar: "/avatar-1.jpg",
  },
  {
    id: "review-2",
    name: "Мария Петрова",
    role: "Основатель, BrandUp",
    text: "Отличный дизайн, быстрая разработка и полное сопровождение после запуска. Обращусь ещё!",
    avatar: "/avatar-2.jpg",
  },
  {
    id: "review-3",
    name: "Дмитрий Смирнов",
    role: "Product Manager, TaskFlow",
    text: "Сделали сложное веб-приложение с нуля. Код чистый, документация отличная. Спасибо за работу!",
    avatar: "/avatar-3.jpg",
  },
  {
    id: "review-4",
    name: "Елена Козлова",
    role: "Директор, FitLife",
    text: "Очень довольна результатом. Сайт работает быстро, дизайн современный, клиенты в восторге.",
    avatar: "/avatar-4.jpg",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Сколько времени занимает разработка сайта?",
    answer: "Лендинг — от 3 до 7 дней. Корпоративный сайт — от 2 до 4 недель. Интернет-магазин — от 4 до 8 недель. Сроки зависят от сложности проекта.",
  },
  {
    id: "faq-2",
    question: "Сколько стоит разработка сайта?",
    answer: "Стоимость зависит от сложности. Лендинг — от 30 000 ₽, корпоративный сайт — от 60 000 ₽, интернет-магазин — от 120 000 ₽. Точную цену назову после обсуждения.",
  },
  {
    id: "faq-3",
    question: "Что нужно для старта?",
    answer: "Достаточно описать идею, цели и примерный функционал. Остальное я помогу проработать на этапе обсуждения.",
  },
  {
    id: "faq-4",
    question: "Вы даёте гарантию на сайт?",
    answer: "Да, после запуска я предоставляю месяц бесплатной поддержки. Исправляю баги и помогаю с правками.",
  },
  {
    id: "faq-5",
    question: "Нужен ли хостинг и домен?",
    answer: "Да, сайту нужен хостинг и домен. Я помогаю с выбором и настройкой, либо могу разместить сайт на Vercel — это быстро и надёжно.",
  },
  {
    id: "faq-6",
    question: "Будет ли сайт адаптирован под телефоны?",
    answer: "Обязательно. Все сайты делаются с адаптивной вёрсткой: от 320px до 4K. Проверяю на реальных устройствах перед сдачей.",
  },
];

export const technologies = [
  { name: "HTML", icon: "FileCode" },
  { name: "CSS", icon: "FileType" },
  { name: "JavaScript", icon: "FileJson" },
  { name: "TypeScript", icon: "FileType" },
  { name: "React", icon: "Atom" },
  { name: "Next.js", icon: "Hexagon" },
  { name: "Node.js", icon: "Server" },
  { name: "Express", icon: "Zap" },
  { name: "PostgreSQL", icon: "Database" },
  { name: "MongoDB", icon: "Database" },
  { name: "Docker", icon: "Container" },
  { name: "Git", icon: "GitBranch" },
];

export const whyMeCards = [
  {
    id: "design",
    title: "Современный дизайн",
    description: "Минимализм, трендовые решения, внимание к деталям. Каждый сайт уникален.",
    icon: "Palette",
  },
  {
    id: "speed",
    title: "Высокая скорость",
    description: "Оптимизация кода и изображений. Lighthouse 95+. Сайты летают.",
    icon: "Zap",
  },
  {
    id: "responsive",
    title: "Адаптивность",
    description: "Идеально на любых устройствах: от iPhone SE до 4K мониторов.",
    icon: "Smartphone",
  },
  {
    id: "seo",
    title: "SEO-оптимизация",
    description: "Правильная структура, мета-теги, OpenGraph, Schema.org — всё для топов.",
    icon: "Search",
  },
  {
    id: "support",
    title: "Поддержка после запуска",
    description: "Месяц бесплатной поддержки. Помогаю с правками и доработками.",
    icon: "HeartHandshake",
  },
]