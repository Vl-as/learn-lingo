import type { Locale } from './types';

const languageCodes: Record<string, string> = {
  English: 'en',
  German: 'de',
  French: 'fr',
  Ukrainian: 'uk',
  Polish: 'pl',
  Vietnamese: 'vi',
  'Mandarin Chinese': 'zh',
  Spanish: 'es',
  Italian: 'it',
  Korean: 'ko',
  Japanese: 'ja',
  Portuguese: 'pt',
};

const levelLabels: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  uk: {
    'A1 Beginner': 'A1 Початковий',
    'A2 Elementary': 'A2 Елементарний',
    'B1 Intermediate': 'B1 Середній',
    'B2 Upper-Intermediate': 'B2 Вище середнього',
    'C1 Advanced': 'C1 Просунутий',
    'C2 Proficient': 'C2 Вільне володіння',
  },
  ru: {
    'A1 Beginner': 'A1 Начальный',
    'A2 Elementary': 'A2 Элементарный',
    'B1 Intermediate': 'B1 Средний',
    'B2 Upper-Intermediate': 'B2 Выше среднего',
    'C1 Advanced': 'C1 Продвинутый',
    'C2 Proficient': 'C2 Свободное владение',
  },
  de: {
    'A1 Beginner': 'A1 Anfänger',
    'A2 Elementary': 'A2 Grundkenntnisse',
    'B1 Intermediate': 'B1 Mittelstufe',
    'B2 Upper-Intermediate': 'B2 Gehobene Mittelstufe',
    'C1 Advanced': 'C1 Fortgeschritten',
    'C2 Proficient': 'C2 Exzellent',
  },
};

export function formatLevel(level: string, locale: Locale): string {
  if (locale === 'en') return level;

  return levelLabels[locale][level] ?? level;
}

export function formatLanguage(name: string, locale: Locale): string {
  const code = languageCodes[name];

  if (!code || locale === 'en') return name;

  try {
    const label = new Intl.DisplayNames(locale, { type: 'language' }).of(code);

    if (!label) return name;

    return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1);
  } catch {
    return name;
  }
}
