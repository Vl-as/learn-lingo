import { ButtonHTMLAttributes } from 'react';
import css from './Button.module.css';
import clsx from 'clsx';

function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(css.button, className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
