import { DEFAULT_LOCALE, isLocale, type Locale } from './types';

export const LOCALE_STORAGE_KEY = 'learn-lingo-locale';

const listeners = new Set<() => void>();

export function subscribe(callback: () => void) {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
}

export function getSnapshot(): Locale {
  const value = document.documentElement.dataset.locale;

  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export function setLocale(locale: Locale) {
  document.documentElement.dataset.locale = locale;
  document.documentElement.lang = locale;

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {}

  listeners.forEach(listener => listener());
}
