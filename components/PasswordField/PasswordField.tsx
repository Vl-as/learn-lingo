'use client';

import { InputHTMLAttributes, useId, useState } from 'react';
import css from './PasswordField.module.css';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import { useT, translateMessage } from '@/i18n/useT';

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

function PasswordField({ className, error, ...props }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const fieldId = useId();
  const { t } = useT();
  const displayedError = translateMessage(error, t);

  return (
    <div className={clsx(css.wrapper, className)}>
      <div className={css.inputWrapper}>
        <input
          aria-invalid={!!error}
          aria-describedby={displayedError ? fieldId : undefined}
          type={isVisible ? 'text' : 'password'}
          className={clsx(css.input, error && css.errorInput)}
          {...props}
        />
        <button
          aria-label={
            isVisible ? t('auth.hidePassword') : t('auth.showPassword')
          }
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
      {displayedError && (
        <span id={fieldId} className={css.error}>
          {displayedError}
        </span>
      )}
    </div>
  );
}

export default PasswordField;
