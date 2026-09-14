"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <AlertCircle className="mb-6 h-20 w-20 text-primary" />
      <h1 className="text-6xl font-bold text-light">404</h1>
      <p className="mt-4 max-w-md text-lg text-light/60">
        Страница, которую вы ищете, не найдена или была перемещена.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-dark transition-colors hover:bg-accent"
      >
        <ArrowLeft size={16} />
        На главную
      </Link>
    </main>
  );
}