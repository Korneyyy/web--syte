"use client";

import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft, ChevronRight, Quote, Send } from "lucide-react";
import { reviews } from "@/data";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const reviewSchema = z.object({
  name: z.string().min(2, "Имя обязательно (минимум 2 символа)"),
  role: z.string().optional(),
  text: z.string().min(10, "Слишком короткий отзыв (минимум 10 символов)"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

function ReviewForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: ReviewFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Ошибка отправки");
        return;
      }

      reset();
    } catch {
      setServerError("Ошибка соединения");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6">
      <h4 className="mb-4 font-semibold text-light">Оставить отзыв</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input
              placeholder="Ваше имя"
              aria-label="Ваше имя"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Компания / роль (необязательно)"
              aria-label="Компания или роль"
              {...register("role")}
            />
          </div>
        </div>
        <div>
          <Textarea
            placeholder="Ваш отзыв"
            aria-label="Ваш отзыв"
            {...register("text")}
          />
          {errors.text && (
            <p className="mt-1 text-sm text-red-400">{errors.text.message}</p>
          )}
        </div>

        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? (
            "Отправка..."
          ) : (
            <>
              Отправить отзыв <Send size={14} />
            </>
          )}
        </Button>

        {serverError && (
          <p className="text-sm text-red-400">{serverError}</p>
        )}

        {isSubmitSuccessful && !serverError && (
          <p className="text-sm text-green-400">
            Спасибо! Отзыв отправлен на проверку и скоро появится на сайте.
          </p>
        )}
      </form>
    </div>
  );
}

function useIsDesktop() {
  return useSyncExternalStore(subscribeToMedia, getSnapshot, getServerSnapshot);

  function subscribeToMedia(onChange: () => void) {
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }

  function getSnapshot() {
    return window.matchMedia("(min-width: 768px)").matches;
  }

  function getServerSnapshot() {
    return false;
  }
}

export function Reviews() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [paused, setPaused] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const visible = isDesktop
    ? [reviews[current], reviews[(current + 1) % reviews.length]]
    : [reviews[current]];

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
            aria-label="Предыдущий отзыв"
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
            aria-label="Следующий отзыв"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-light/40 transition-colors hover:border-primary hover:text-primary cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFormOpen((o) => !o)}
          >
            {isFormOpen ? "Скрыть форму" : "Оставить отзыв"}
          </Button>
        </div>

        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 max-w-2xl mx-auto">
                <ReviewForm />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}