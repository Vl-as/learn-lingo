'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Modal from '../Modal/Modal';
import { accents } from '@/data/accents';
import { applyAccent, useAccent } from '@/hooks/useAccent';
import css from './AccentPicker.module.css';

interface AccentPickerProps {
  onOpen?: () => void;
}

function AccentPicker({ onOpen }: AccentPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const accent = useAccent();

  return (
    <>
      <button
        type="button"
        className={css.trigger}
        onClick={() => {
          setIsOpen(true);
          onOpen?.();
        }}
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
