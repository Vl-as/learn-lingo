'use client';

import { useState, useSyncExternalStore } from 'react';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import {
  accents,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isThemeId,
  themes,
  type AccentId,
  type ThemeId,
} from '@/data/accents';
import { applyAccent, useAccent } from '@/hooks/useAccent';
import { useT } from '@/i18n/useT';
import type { Locale, TranslationKey } from '@/i18n/types';
import css from './AccentPicker.module.css';

interface AccentPickerProps {
  onOpen?: () => void;
}

const languageOptions: { id: Locale; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'uk', label: 'Українська' },
  { id: 'ru', label: 'Русский' },
  { id: 'de', label: 'Deutsch' },
];

const themeLabelKeys: Record<ThemeId, TranslationKey> = {
  light: 'settings.themes.light',
  dark: 'settings.themes.dark',
};

const accentLabelKeys: Record<AccentId, TranslationKey> = {
  sage: 'settings.accents.sage',
  sky: 'settings.accents.sky',
  peach: 'settings.accents.peach',
  lavender: 'settings.accents.lavender',
  rose: 'settings.accents.rose',
};

const themeListeners = new Set<() => void>();

function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);

  return () => {
    themeListeners.delete(callback);
  };
}

function notifyTheme() {
  themeListeners.forEach(listener => listener());
}

function saveTheme(theme: ThemeId) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}

function getThemeSnapshot(): ThemeId {
  const value = document.documentElement.dataset.theme;

  return isThemeId(value) ? value : DEFAULT_THEME;
}

function getServerTheme(): ThemeId {
  return DEFAULT_THEME;
}

function applyTheme(id: ThemeId) {
  document.documentElement.dataset.theme = id;
  saveTheme(id);
  notifyTheme();
}

function AccentPicker({ onOpen }: AccentPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const accent = useAccent();
  const { t, locale, setLocale } = useT();
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerTheme
  );

  return (
    <>
      <button
        type="button"
        className={css.trigger}
        onClick={() => {
          setIsOpen(true);
          onOpen?.();
        }}
        aria-label={t('settings.changeAppearance')}
        title={t('settings.changeAppearance')}
      >
        <span className={css.dot} data-accent={accent} />
        <span className={css.code}>{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className={css.container}>
            <h2 className={css.title}>{t('settings.appearance')}</h2>
            <p className={css.text}>{t('settings.description')}</p>

            <h3 className={css.sectionTitle}>{t('settings.language')}</h3>
            <div
              className={css.themeOptions}
              role="radiogroup"
              aria-label={t('settings.language')}
            >
              {languageOptions.map(item => (
                <label
                  key={item.id}
                  className={clsx(
                    css.option,
                    locale === item.id && css.optionActive
                  )}
                >
                  <input
                    className={css.radio}
                    type="radio"
                    name="language"
                    checked={locale === item.id}
                    onChange={() => setLocale(item.id)}
                  />
                  <span className={css.langPreview}>
                    {item.id.toUpperCase()}
                  </span>
                  <span className={css.optionLabel}>{item.label}</span>
                </label>
              ))}
            </div>

            <h3 className={css.sectionTitle}>{t('settings.theme')}</h3>
            <div
              className={css.themeOptions}
              role="radiogroup"
              aria-label={t('settings.theme')}
            >
              {themes.map(item => (
                <label
                  key={item.id}
                  className={clsx(
                    css.option,
                    theme === item.id && css.optionActive
                  )}
                >
                  <input
                    className={css.radio}
                    type="radio"
                    name="theme"
                    checked={theme === item.id}
                    onChange={() => applyTheme(item.id)}
                  />
                  <span className={css.themePreview} data-theme={item.id} />
                  <span className={css.optionLabel}>
                    {t(themeLabelKeys[item.id])}
                  </span>
                </label>
              ))}
            </div>

            <h3 className={css.sectionTitle}>{t('settings.accentColor')}</h3>
            <div
              className={css.options}
              role="radiogroup"
              aria-label={t('settings.accentColor')}
            >
              {accents.map(item => (
                <label
                  key={item.id}
                  className={clsx(
                    css.option,
                    accent === item.id && css.optionActive
                  )}
                >
                  <input
                    className={css.radio}
                    type="radio"
                    name="accent"
                    checked={accent === item.id}
                    onChange={() => applyAccent(item.id)}
                  />
                  <span className={css.swatch} data-accent={item.id} />
                  <span className={css.optionLabel}>
                    {t(accentLabelKeys[item.id])}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default AccentPicker;
