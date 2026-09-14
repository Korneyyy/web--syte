export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
}

export const CONSENT_KEY = "astraweb-consent";
export const CONSENT_EVENT = "astraweb-consent-change";

let consentCache: ConsentState | null | undefined;

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  if (consentCache === undefined) consentCache = readConsent();
  return consentCache;
}

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}
export function subscribeConsent(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) {
      consentCache = readConsent();
      onChange();
    }
  };
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function setConsent(state: ConsentState) {
  consentCache = state;
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

