import { InputHTMLAttributes } from 'react';
import css from './Input.module.css';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
}

function Input({ className, error, ...props }: InputProps) {
  return (
    <div className={clsx(css.wrapper, className)}>
      <input className={clsx(css.input, error && css.errorInput)} {...props} />
      {error && <span className={css.error}>{error}</span>}
    </div>
  );
}

export default Input;
