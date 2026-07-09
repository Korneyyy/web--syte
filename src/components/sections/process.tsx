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
        {/* Decorative connecting lines */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block md:left-[calc(50%-0.5px)] lg:left-[calc(33.33%-0.5px)]" aria-hidden />

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative flex gap-4 md:flex-col md:items-center md:text-center"
          >
            {/* Step number + line */}
            <div className="flex flex-col items-center md:mb-3">
              <motion.span
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.15 + 0.2, type: "spring" }}
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-light shadow-lg shadow-primary/25"
              >
                {step.number}
              </motion.span>
              {index < steps.length - 1 && (
                <div className="md:hidden w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-light">{step.title}</h3>
              <p className="mt-1 text-sm text-light/60 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}