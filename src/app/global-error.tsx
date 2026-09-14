"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="ru">
      <body className="flex min-h-dvh flex-col items-center justify-center bg-dark px-4 text-center font-sans">
        <AlertCircle className="mb-6 h-20 w-20 text-red-400" />
        <h1 className="text-4xl font-bold text-light">Критическая ошибка</h1>
        <p className="mt-4 max-w-md text-lg text-light/60">
          Приложение столкнулось с критической ошибкой. Попробуйте перезагрузить страницу.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-dark transition-colors hover:bg-accent"
        >
          <RefreshCcw size={16} />
          Попробовать снова
        </button>
      </body>
    </html>
  );
}