"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Globe,
  Building2,
  ShoppingCart,
  Code2,
  Search,
  BarChart3,
  Plug,
  Zap,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/section";

const siteTypes = [
  { id: "landing", label: "Лендинг", icon: Globe, price: 25000 },
  { id: "corporate", label: "Корпоративный", icon: Building2, price: 40000 },
  { id: "ecommerce", label: "Интернет-магазин", icon: ShoppingCart, price: 80000 },
  { id: "webapp", label: "Веб-приложение", icon: Code2, price: 100000 },
];

const pageOptions = [
  { id: "pages-5", label: "1–5", multiplier: 1 },
  { id: "pages-15", label: "6–15", multiplier: 1.5 },
  { id: "pages-30", label: "16–30", multiplier: 2 },
  { id: "pages-30plus", label: "30+", multiplier: 2.5 },
];

const features = [
  { id: "seo", label: "SEO", icon: Search, price: 8000 },
  { id: "api", label: "API / Интеграции", icon: Plug, price: 20000 },
  { id: "analytics", label: "Аналитика", icon: BarChart3, price: 5000 },
];

function AnimatedPrice({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * ease));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return (
    <span>
      {display.toLocaleString("ru-RU")}{" "}
      <span className="text-2xl md:text-3xl text-light/50">₽</span>
    </span>
  );
}

export function Calculator() {
  const [siteType, setSiteType] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [urgent, setUrgent] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleFeature = useCallback((id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const basePrice = siteTypes.find((s) => s.id === siteType)?.price ?? 0;
  const pageMultiplier = pageOptions.find((p) => p.id === pageCount)?.multiplier ?? 1;
  const featuresPrice = features
    .filter((f) => selectedFeatures.includes(f.id))
    .reduce((sum, f) => sum + f.price, 0);
  const urgencyMultiplier = urgent ? 1.5 : 1;
  const total = Math.round((basePrice * pageMultiplier + featuresPrice) * urgencyMultiplier);

  const isComplete = siteType !== null && pageCount !== null;

  return (
    <Section
      id="calculator"
      title="Рассчитайте стоимость"
      subtitle="Выберите параметры — и получите примерную стоимость за секунду"
    >
      <div ref={ref} className="mx-auto max-w-4xl">
        {/* Steps */}
        <div className="space-y-10">
          {/* Step 1 — Site type */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              01 — Тип сайта
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {siteTypes.map((type) => {
                const Icon = type.icon;
                const active = siteType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSiteType(type.id)}
                    className={`group relative flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all duration-300 cursor-pointer ${
                      active
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon
                      size={28}
                      className={`transition-colors duration-300 ${
                        active ? "text-primary" : "text-light/40 group-hover:text-light/60"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        active ? "text-light" : "text-light/60 group-hover:text-light/80"
                      }`}
                    >
                      {type.label}
                    </span>
                    <span className="text-xs text-light/30">
                      от {(type.price / 1000).toFixed(0)} 000 ₽
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Step 2 — Pages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              02 — Количество страниц
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {pageOptions.map((opt) => {
                const active = pageCount === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPageCount(opt.id)}
                    className={`rounded-2xl border px-4 py-4 text-center transition-all duration-300 cursor-pointer ${
                      active
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        active ? "text-light" : "text-light/60"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Step 3 — Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              03 — Дополнительный функционал
            </p>
            <div className="flex flex-wrap gap-3">
              {features.map((feat) => {
                const Icon = feat.icon;
                const active = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
                      active
                        ? "border-primary bg-primary/10 text-light shadow-lg shadow-primary/10"
                        : "border-white/10 bg-white/[0.02] text-light/50 hover:border-white/20 hover:bg-white/[0.04] hover:text-light/70"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{feat.label}</span>
                    <span className="text-xs text-light/30">
                      +{(feat.price / 1000).toFixed(0)} 000
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Step 4 — Urgency */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              04 — Сроки
            </p>
            <button
              onClick={() => setUrgent((v) => !v)}
              className={`flex items-center gap-4 rounded-2xl border px-6 py-4 transition-all duration-300 cursor-pointer ${
                urgent
                  ? "border-amber-500/50 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <Zap
                size={22}
                className={urgent ? "text-amber-400" : "text-light/30"}
              />
              <div className="text-left">
                <p
                  className={`font-medium transition-colors ${
                    urgent ? "text-light" : "text-light/70"
                  }`}
                >
                  {urgent ? "Срочная разработка" : "Обычные сроки"}
                </p>
                <p className="text-sm text-light/40">
                  {urgent
                    ? "Ускоренная разработка за +50%"
                    : "Стандартные сроки без переплат"}
                </p>
              </div>
              <div
                className={`ml-auto flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  urgent
                    ? "bg-amber-500 text-dark"
                    : "bg-white/10 text-light/30"
                }`}
              >
                <Clock size={18} />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Result */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm"
            >
              <p className="text-sm uppercase tracking-wider text-light/40">
                Примерная стоимость
              </p>
              <div className="mt-3 text-3xl sm:text-5xl md:text-6xl font-bold text-light">
                <AnimatedPrice value={total} />
              </div>
              <p className="mt-4 text-sm text-light/40">
                Точную цену назову после обсуждения деталей проекта
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-light shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:scale-105"
              >
                Получить точный расчёт
                <ArrowRight size={18} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
