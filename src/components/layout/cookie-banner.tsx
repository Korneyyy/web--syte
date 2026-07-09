"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type CookieChoice = "accepted" | "declined" | null;

export function CookieBanner() {
  const [choice, setChoice] = useState<CookieChoice>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cookies-accepted") as CookieChoice;
    setChoice(stored);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "accepted");
    setChoice("accepted");
  };

  const decline = () => {
    localStorage.setItem("cookies-accepted", "declined");
    setChoice("declined");
  };

  return (
    <AnimatePresence>
      {!choice && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-dark/95 backdrop-blur-xl p-4"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-light/60 text-center sm:text-left">
              Этот сайт использует cookie для улучшения работы. Продолжая использование сайта, вы соглашаетесь с этим.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={decline}>
                Отказаться
              </Button>
              <Button size="sm" onClick={accept}>
                Принять
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
