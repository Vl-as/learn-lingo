'use client';

import { useState, useSyncExternalStore } from 'react';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  accents,
  isThemeId,
  themes,
  type ThemeId,
} from '@/data/accents';
import { applyAccent, useAccent } from '@/hooks/useAccent';
import css from './AccentPicker.module.css';

interface AccentPickerProps {
  onOpen?: () => void;
}

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
        aria-label="Change appearance"
        title="Change appearance"
      >
        <span className={css.dot} data-accent={accent} />
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className={css.container}>
            <h2 className={css.title}>Appearance</h2>
            <p className={css.text}>
              Choose a theme and an accent color. Your choice is saved in this
              browser.
            </p>

            <h3 className={css.sectionTitle}>Theme</h3>
            <div
              className={css.themeOptions}
              role="radiogroup"
              aria-label="Theme"
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
                  <span className={css.optionLabel}>{item.label}</span>
                </label>
              ))}
            </div>

            <h3 className={css.sectionTitle}>Accent color</h3>
            <div
              className={css.options}
              role="radiogroup"
              aria-label="Accent color"
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
                  <span className={css.optionLabel}>{item.label}</span>
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
