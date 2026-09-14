export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
}

export const CONSENT_KEY = "astraweb-consent";
export const CONSENT_EVENT = "astraweb-consent-change";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

export function setConsent(state: ConsentState) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}