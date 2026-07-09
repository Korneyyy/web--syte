"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews } from "@/data";
import { Section } from "@/components/ui/section";

export function Reviews() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [paused, setPaused] = useState(false);

  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const visible = (() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      const items = [];
      for (let i = 0; i < Math.min(2, reviews.length); i++) {
        items.push(reviews[(current + i) % reviews.length]);
      }
      return items;
    }
    return [reviews[current]];
  })();

  return (
    <Section
      id="reviews"
      title="Отзывы"
      subtitle="Что говорят клиенты"
    >
      <div ref={ref} className="relative mx-auto max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 text-center"
            >
              <Quote className="mx-auto mb-4 h-6 w-6 md:h-8 md:w-8 text-primary/40" />
              <p className="text-sm md:text-base text-light/80 leading-relaxed">
                {review.text}
              </p>
              <div className="mt-6">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center text-sm font-bold text-light">
                  {review.name[0]}
                </div>
                <h4 className="mt-3 font-semibold text-light text-sm md:text-base">{review.name}</h4>
                <p className="text-xs md:text-sm text-light/40">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => { setPaused(true); prev(); }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-light/40 transition-colors hover:border-primary hover:text-primary cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setPaused(true); setCurrent(i); }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === current
                    ? "w-6 bg-primary"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => { setPaused(true); next(); }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-light/40 transition-colors hover:border-primary hover:text-primary cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Section>
  );
}