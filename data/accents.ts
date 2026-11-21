export const ACCENT_STORAGE_KEY = 'learn-lingo-accent';

export const accents = [
  { id: 'sage', label: 'Sage' },
  { id: 'sky', label: 'Sky' },
  { id: 'peach', label: 'Peach' },
  { id: 'lavender', label: 'Lavender' },
  { id: 'rose', label: 'Rose' },
] as const;

export type AccentId = (typeof accents)[number]['id'];

export const DEFAULT_ACCENT: AccentId = 'sage';

export function isAccentId(value: unknown): value is AccentId {
  return accents.some(accent => accent.id === value);
}
