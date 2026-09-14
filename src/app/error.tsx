"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <AlertCircle className="mb-6 h-20 w-20 text-red-400" />
      <h1 className="text-4xl font-bold text-light">Что-то пошло не так</h1>
      <p className="mt-4 max-w-md text-lg text-light/60">
        Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-dark transition-colors hover:bg-accent"
      >
        <RefreshCcw size={16} />
        Попробовать снова
      </button>
    </main>
  );
}