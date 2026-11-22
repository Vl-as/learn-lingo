'use client';

import clsx from 'clsx';
import css from './Loader.module.css';
import { useT } from '@/i18n/useT';

interface LoaderProps {
  className?: string;
}
function Loader({ className }: LoaderProps) {
  const { t } = useT();

  return (
    <div
      className={clsx(css.loader, className)}
      role="status"
      aria-label={t('common.loading')}
    />
  );
}

export default Loader;
