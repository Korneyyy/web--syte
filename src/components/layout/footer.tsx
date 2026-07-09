import { Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <a href="#" className="text-xl font-bold text-light">
              websyte<span className="text-primary">.</span>
            </a>
            <p className="mt-2 text-sm text-light/40">
              Разработка современных сайтов под ключ
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://t.me/deya_vocals"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-light/40 transition-all hover:border-primary hover:text-primary"
              aria-label="Telegram @deya_vocals"
            >
              <Send size={18} />
            </a>
            <a
              href="https://t.me/Korneyyy97"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-light/40 transition-all hover:border-primary hover:text-primary"
              aria-label="Telegram @Korneyyy97"
            >
              <Send size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-light/30">
          © {new Date().getFullYear()} websyte. Все права защищены.
        </div>
      </div>
    </footer>
  );
}