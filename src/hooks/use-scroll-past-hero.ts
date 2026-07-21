"use client";

import { useState, useEffect } from "react";

export function useScrollPastHero() {
  const [past, setPast] = useState(true);

  useEffect(() => {
    const check = () => setPast(window.scrollY > window.innerHeight * 0.8);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return past;
}
