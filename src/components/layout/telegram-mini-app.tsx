"use client";

import Script from "next/script";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        ready: () => void;
        expand: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        disableVerticalSwipes?: () => void;
      };
    };
  }
}

const TG_BACKGROUND = "#0F172A";

export function TelegramMiniApp() {
  return (
    <Script
      id="telegram-webapp-sdk"
      src="https://telegram.org/js/telegram-web-app.js"
      strategy="afterInteractive"
      onLoad={() => {
        const webApp = window.Telegram?.WebApp;
        if (!webApp || !webApp.initData) return;
        webApp.ready();
        webApp.expand();
        webApp.setHeaderColor(TG_BACKGROUND);
        webApp.setBackgroundColor(TG_BACKGROUND);
        if (typeof webApp.disableVerticalSwipes === "function") {
          webApp.disableVerticalSwipes();
        }
      }}
    />
  );
}