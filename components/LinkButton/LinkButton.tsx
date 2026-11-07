import { ComponentProps } from 'react';
import css from './LinkButton.module.css';
import Link from 'next/link';
import clsx from 'clsx';

function LinkButton({
  href,
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={clsx(css.link, className)} {...props}>
      {children}
    </Link>
  );
}
export default LinkButton;
