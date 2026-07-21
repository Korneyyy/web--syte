"use client";

import { Send } from "lucide-react";
import { useScrollPastHero } from "@/hooks/use-scroll-past-hero";
import { cn } from "@/lib/utils";

export function FloatingTelegram() {
  const past = useScrollPastHero();

  return (
    <a
      href="https://t.me/Korneyyy97"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-light shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:scale-110",
        past ? "sm:opacity-100" : "opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto"
      )}
      aria-label="Написать в Telegram"
    >
      <Send size={20} />
    </a>
  );
}
