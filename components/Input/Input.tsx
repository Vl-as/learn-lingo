'use client';
import { InputHTMLAttributes, useId } from 'react';
import css from './Input.module.css';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

function Input({ className, error, ...props }: InputProps) {
  const fieldId = useId();
  return (
    <div className={clsx(css.wrapper, className)}>
      <input
        aria-invalid={!!error}
        aria-describedby={error ? fieldId : undefined}
        className={clsx(css.input, error && css.errorInput)}
        {...props}
      />
      {error && (
        <span id={fieldId} aria-live="polite" className={css.error}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
