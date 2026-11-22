'use client';
'use client';

import { InputHTMLAttributes, useId } from 'react';
import css from './Input.module.css';
import clsx from 'clsx';
import { useT, translateMessage } from '@/i18n/useT';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

function Input({ className, error, ...props }: InputProps) {
  const fieldId = useId();
  const { t } = useT();
  const displayedError = translateMessage(error, t);

  return (
    <div className={clsx(css.wrapper, className)}>
      <input
        aria-invalid={!!error}
        aria-describedby={displayedError ? fieldId : undefined}
        className={clsx(css.input, error && css.errorInput)}
        {...props}
      />
      {displayedError && (
        <span id={fieldId} aria-live="polite" className={css.error}>
          {displayedError}
        </span>
      )}
    </div>
  );
}

export default Input;
