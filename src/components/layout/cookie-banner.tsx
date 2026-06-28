"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("cookies-accepted");
    if (!stored) setAccepted(false);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setAccepted(true);
  };

  return (
    <AnimatePresence>
      {!accepted && (
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
            <Button size="sm" onClick={accept}>
              Принять
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
