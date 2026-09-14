"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { portfolioItems } from "@/data";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function Portfolio() {
  const [item, setItem] = useState<(typeof portfolioItems)[number] | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const open = (project: (typeof portfolioItems)[number]) => {
    setItem(project);
    setIndex(0);
    setDirection(0);
  };

  const close = () => setItem(null);

  const go = useCallback((dir: 1 | -1) => {
    const count = item?.screenshots?.length;
    if (!count) return;
    setDirection(dir);
    setIndex((i) => (i + dir + count) % count);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [item]);

  useEffect(() => {
    if (!item?.screenshots?.length) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setItem(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, go]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <Section id="portfolio" title="Портфолио" subtitle="Примеры моих работ">
      <div className="grid gap-6 md:grid-cols-2">
        {portfolioItems.map((project) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => open(project)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-dark-light/50 text-left cursor-pointer"
          >
            <div
              className="aspect-video"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 bg-dark/70 p-6 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-xl font-semibold text-light">{project.title}</h3>
              <p className="max-w-md text-sm text-light/60">{project.description}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:text-accent">
                <Images size={16} />
                Смотреть скриншоты ({project.screenshots?.length ?? 0})
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/90 to-transparent">
              <h3 className="text-base font-semibold text-light">{project.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-light/50">{project.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-light/40">
        Скоро здесь появятся новые работы
      </p>

      <AnimatePresence>
        {item?.screenshots && item.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-dark/95 backdrop-blur-xl p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Скриншоты проекта ${item.title}`}
          >
            <div onClick={(e) => e.stopPropagation()} className="relative flex w-full max-w-6xl flex-col items-center">
              <div className="mb-4 flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold text-light">
                  {item.title}
                  <span className="ml-3 text-sm font-normal text-light/40">
                    {index + 1} / {item.screenshots.length}
                  </span>
                </h3>
                <button
                  onClick={close}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-light/60 transition-colors hover:border-white/30 hover:text-light cursor-pointer"
                  aria-label="Закрыть"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-dark-light/50">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.img
                    key={index}
                    src={item.screenshots[index]}
                    alt={`${item.title} — скриншот ${index + 1}`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="max-h-[70vh] w-full object-contain"
                  />
                </AnimatePresence>

                {item.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() => go(-1)}
                      className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-dark/70 text-light/80 backdrop-blur-md transition-all hover:bg-dark hover:text-light hover:scale-110 cursor-pointer"
                      aria-label="Предыдущий скриншот"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={() => go(1)}
                      className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-dark/70 text-light/80 backdrop-blur-md transition-all hover:bg-dark hover:text-light hover:scale-110 cursor-pointer"
                      aria-label="Следующий скриншот"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2">
                {item.screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      i === index ? "w-7 bg-primary" : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Скриншот ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}