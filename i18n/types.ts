import type { en } from './locales/en';

export type Locale = 'en' | 'uk' | 'ru' | 'de';
export const DEFAULT_LOCALE: Locale = 'en';

type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends Record<string, unknown>
      ? `${K}.${NestedKeyOf<T[K]>}`
      : never;
}[keyof T & string];

export type TranslationKey = NestedKeyOf<typeof en>;

export type Widen<T> = {
  [K in keyof T]: T[K] extends string ? string : Widen<T[K]>;
};

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'uk' || value === 'ru' || value === 'de';
}
