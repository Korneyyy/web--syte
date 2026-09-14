"use client";

import { useEffect, useRef } from "react";
import { getConsent, CONSENT_EVENT } from "@/lib/consent";

declare global {
  interface Window {
    ym?: (counterId: number, action: "init", params: Record<string, boolean>) => void;
  }
}

interface YandexMetrikaProps {
  counterId?: string;
}

function initMetrika(counterId: number, loadedRef: { current: boolean }) {
  if (loadedRef.current) return;
  const consent = getConsent();
  if (!consent?.analytics) return;

  loadedRef.current = true;

  const script = document.createElement("script");
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  script.async = true;
  script.onload = () => {
    window.ym?.(counterId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    });
  };
  document.head.appendChild(script);
}

export function YandexMetrika({ counterId }: YandexMetrikaProps) {
  const loadedRef = useRef(false);
  const id = counterId ? Number(counterId) : null;

  useEffect(() => {
    if (!id) return;
    initMetrika(id, loadedRef);
    const onConsentChange = () => initMetrika(id, loadedRef);
    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
  }, [id]);

  return null;
}