"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent, subscribeConsent } from "@/lib/consent";

export function CookieBanner() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getConsent);
  const shown = consent === null;

  const acceptAll = () => {
    setConsent({ necessary: true, analytics: true });
  };

  const essentialOnly = () => {
    setConsent({ necessary: true, analytics: false });
  };

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-dark/95 backdrop-blur-xl p-4"
          role="dialog"
          aria-label="Настройка cookie"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 lg:flex-row">
            <p className="text-sm text-light/60 text-center sm:text-left">
              Этот сайт использует файлы cookie: необходимые для работы и{" "}
              <a href="/privacy" className="text-primary underline hover:text-accent">
                аналитические
              </a>{" "}
              (Яндекс.Метрика) — с вашего согласия. Подробнее в{" "}
              <a href="/privacy" className="text-primary underline hover:text-accent">
                политике конфиденциальности
              </a>.
            </p>
            <div className="flex shrink-0 flex-wrap justify-center gap-2">
              <Button size="sm" variant="outline" onClick={essentialOnly}>
                Только необходимые
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Принять все
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}