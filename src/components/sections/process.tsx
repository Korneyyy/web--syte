"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/ui/section";

const steps = [
  { number: "01", title: "Обсуждение", desc: "Знакомимся, обсуждаем идею, цели и задачи проекта" },
  { number: "02", title: "Прототип", desc: "Создаю структуру и логику будущего сайта" },
  { number: "03", title: "Дизайн", desc: "Разрабатываю современный и уникальный дизайн" },
  { number: "04", title: "Разработка", desc: "Верстаю и программирую весь функционал" },
  { number: "05", title: "Тестирование", desc: "Проверяю всё на ошибки и нестыковки" },
  { number: "06", title: "Запуск", desc: "Размещаю на хостинге и передаю вам" },
];

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section
      id="process"
      title="Процесс работы"
      subtitle="От идеи до запуска — прозрачно и понятно"
    >
      <div ref={ref} className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 border-l border-white/10"
          >
            <span className="absolute left-0 top-0 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-light">
              {step.number}
            </span>
            <h3 className="text-lg font-semibold text-light">{step.title}</h3>
            <p className="mt-1 text-sm text-light/60">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}