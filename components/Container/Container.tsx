import { ReactNode } from 'react';
import css from './Container.module.css';
import clsx from 'clsx';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return <div className={clsx(css.container, className)}>{children}</div>;
}

export default Container;
