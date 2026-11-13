'use client';

import { InputHTMLAttributes, useState } from 'react';
import css from './PasswordField.module.css';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

function PasswordField({ className, error, ...props }: PasswordFieldProps) {
  const [isShowed, setIsShowed] = useState(false);

  return (
    <div className={clsx(css.wrapper, className)}>
      <div className={css.inputWrapper}>
        <input
          type={isShowed ? 'text' : 'password'}
          className={clsx(css.input, error && css.errorInput)}
          {...props}
        />
        <button
          onClick={() => setIsShowed(prev => !prev)}
          className={css.button}
          type="button"
        >
          <Icon
            width={20}
            height={20}
            className={css.icon}
            name={isShowed ? 'eye-off' : 'eye'}
          />
        </button>
      </div>
      {error && <span className={css.error}>{error}</span>}
    </div>
  );
}

export default PasswordField;
