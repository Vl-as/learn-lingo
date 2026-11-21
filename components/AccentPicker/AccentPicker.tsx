'use client';

import { useState, useSyncExternalStore } from 'react';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import {
  ACCENT_STORAGE_KEY,
  DEFAULT_ACCENT,
  accents,
  isAccentId,
  type AccentId,
} from '@/data/accents';
import css from './AccentPicker.module.css';

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): AccentId {
  const value = document.documentElement.dataset.accent;

  return isAccentId(value) ? value : DEFAULT_ACCENT;
}

function getServerSnapshot(): AccentId {
  return DEFAULT_ACCENT;
}

function applyAccent(id: AccentId) {
  document.documentElement.dataset.accent = id;

  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, id);
  } catch {}

  listeners.forEach(listener => listener());
}

function AccentPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const accent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return (
    <>
      <button
        type="button"
        className={css.trigger}
        onClick={() => setIsOpen(true)}
        aria-label="Change accent color"
        title="Change accent color"
      >
        <span className={css.dot} data-accent={accent} />
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className={css.container}>
            <h2 className={css.title}>Choose a color</h2>
            <p className={css.text}>
              Pick the accent color of the app. Your choice is saved in this
              browser.
            </p>
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
