"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

const contacts = [
  { label: "@deya_vocals", username: "deya_vocals" },
  { label: "@Korneyyy97", username: "Korneyyy97" },
];

export function FloatingTelegram() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-2">
      {/* Popover */}
      {open && (
        <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-dark/95 backdrop-blur-xl p-2 shadow-xl shadow-black/30 animate-in fade-in slide-in-from-bottom-2">
          {contacts.map((c) => (
            <a
              key={c.username}
              href={`https://t.me/${c.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-light/80 transition-colors hover:bg-white/[0.06] hover:text-light"
            >
              <Send size={16} className="text-primary shrink-0" />
              <span>{c.label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-light shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:scale-110 cursor-pointer"
        aria-label="Написать в Telegram"
      >
        <Send size={20} />
      </button>
    </div>
  );
}
