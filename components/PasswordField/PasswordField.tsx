'use client';

import { InputHTMLAttributes, useId, useState } from 'react';
import css from './PasswordField.module.css';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

function PasswordField({ className, error, ...props }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const fieldId = useId();

  return (
    <div className={clsx(css.wrapper, className)}>
      <div className={css.inputWrapper}>
        <input
          aria-invalid={!!error}
          aria-describedby={error ? fieldId : undefined}
          type={isVisible ? 'text' : 'password'}
          className={clsx(css.input, error && css.errorInput)}
          {...props}
        />
        <button
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          onClick={() => setIsVisible(prev => !prev)}
          className={css.button}
          type="button"
        >
          <Icon
            width={20}
            height={20}
            className={css.icon}
            name={isVisible ? 'eye-off' : 'eye'}
          />
        </button>
      </div>
      {error && (
        <span id={fieldId} className={css.error}>
          {error}
        </span>
      )}
    </div>
  );
}

export default PasswordField;
