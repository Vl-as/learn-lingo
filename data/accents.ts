export const ACCENT_STORAGE_KEY = 'learn-lingo-accent';
export const THEME_STORAGE_KEY = 'learn-lingo-theme';

export const accents = [
  { id: 'sage', label: 'Sage' },
  { id: 'sky', label: 'Sky' },
  { id: 'peach', label: 'Peach' },
  { id: 'lavender', label: 'Lavender' },
  { id: 'rose', label: 'Rose' },
] as const;

export const themes = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
] as const;

export type AccentId = (typeof accents)[number]['id'];
export type ThemeId = (typeof themes)[number]['id'];

export const accentColors: Record<AccentId, readonly [number, number, number]> =
  {
    sage: [159, 186, 174],
    sky: [157, 184, 214],
    peach: [232, 180, 154],
    lavender: [181, 168, 214],
    rose: [224, 163, 179],
  };

export const DEFAULT_ACCENT: AccentId = 'sage';
export const DEFAULT_THEME: ThemeId = 'light';

export function isAccentId(value: unknown): value is AccentId {
  return accents.some(accent => accent.id === value);
}

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some(theme => theme.id === value);
}
