'use client';

import { useSyncExternalStore } from 'react';
import { en } from './locales/en';
import de from './locales/de';
import ru from './locales/ru';
import uk from './locales/uk';
import { getServerSnapshot, getSnapshot, setLocale, subscribe } from './store';
import type { Locale, TranslationKey, Widen } from './types';

type Dictionary = Widen<typeof en>;
type TranslationParams = Record<string, string | number>;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  uk,
  ru,
  de,
};

function lookup(dictionary: Dictionary, key: string): string | undefined {
  let value: unknown = dictionary;

  for (const part of key.split('.')) {
    if (typeof value !== 'object' || value === null || !(part in value)) {
      return undefined;
    }

    value = (value as Record<string, unknown>)[part];
  }

  return typeof value === 'string' ? value : undefined;
}

function interpolate(value: string, params?: TranslationParams): string {
  if (!params) return value;

  return value.replace(/\{(\w+)\}/g, (placeholder, key: string) => {
    const replacement = params[key];

    return replacement === undefined ? placeholder : String(replacement);
  });
}

function translate(
  locale: Locale,
  key: TranslationKey,
  params?: TranslationParams
): string {
  const pluralKeys: string[] = [];

  if (typeof params?.count === 'number') {
    const category = new Intl.PluralRules(locale).select(params.count);
    pluralKeys.push(`${key}_${category}`, `${key}_other`);
  }

  for (const candidate of pluralKeys) {
    const value = lookup(dictionaries[locale], candidate);
    if (value !== undefined) return interpolate(value, params);
  }

  for (const candidate of pluralKeys) {
    const value = lookup(en, candidate);
    if (value !== undefined) return interpolate(value, params);
  }

  const value = lookup(dictionaries[locale], key) ?? lookup(en, key);

  return interpolate(value ?? key, params);
}

export function isTranslationKey(value: string): value is TranslationKey {
  return lookup(en, value) !== undefined;
}

export function translateMessage(
  message: string | undefined,
  t: (key: TranslationKey) => string
): string | undefined {
  if (message === undefined || !isTranslationKey(message)) return message;

  return t(message);
}

export function useT() {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return {
    locale,
    setLocale,
    t: (key: TranslationKey, params?: TranslationParams) =>
      translate(locale, key, params),
  };
}
