"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { useScrollPastHero } from "@/hooks/use-scroll-past-hero";
import { cn } from "@/lib/utils";

const notifications = [
  { name: "Алексей", city: "Москва", action: "оставил заявку", icon: FileText },
  { name: "Мария", city: "Санкт-Петербург", action: "заказала лендинг", icon: MessageCircle },
  { name: "Дмитрий", city: "Казань", action: "позвонил для консультации", icon: Phone },
  { name: "Анна", city: "Новосибирск", action: "оставил заявку", icon: FileText },
  { name: "Сергей", city: "Екатеринбург", action: "заказал корпоративный сайт", icon: MessageCircle },
  { name: "Елена", city: "Краснодар", action: "оставил заявку", icon: FileText },
  { name: "Максим", city: "Воронеж", action: "заказал интернет-магазин", icon: MessageCircle },
  { name: "Ольга", city: "Самара", action: "оставил заявку", icon: FileText },
  { name: "Артём", city: "Ростов-на-Дону", action: "позвонил для консультации", icon: Phone },
  { name: "Наталья", city: "Уфа", action: "оставил заявку", icon: FileText },
];

const timeAgo = [
  "2 минуты назад",
  "5 минут назад",
  "12 минут назад",
  "18 минут назад",
  "25 минут назад",
  "1 час назад",
];

export function SocialProof() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const past = useScrollPastHero();

  useEffect(() => {
    let count = 0;
    const maxShows = 3;

    const show = () => {
      if (count >= maxShows) return;
      setVisible(true);
      count++;
      setTimeout(() => setVisible(false), 5000);
    };

    const first = setTimeout(show, 18000);
    const interval = setInterval(show, 50000);
    const rotate = setInterval(() => {
      setCurrent((prev) => (prev + 1) % notifications.length);
    }, 50000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
      clearInterval(rotate);
    };
  }, []);

  const n = notifications[current];
  const Icon = n.icon;
  const time = timeAgo[current % timeAgo.length];

  return (
    <div className={cn(
      "fixed bottom-28 left-6 z-50 pointer-events-none transition-opacity duration-500",
      past ? "sm:opacity-100" : "opacity-0 sm:opacity-100"
    )}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-dark/95 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-xl max-w-[280px]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <Icon size={16} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-light">
                {n.name}{" "}
                <span className="text-light/40">из {n.city}</span>
              </p>
              <p className="truncate text-xs text-light/40">
                {n.action} · {time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
