'use client';

import Image from 'next/image';
import css from './NotFoundCard.module.css';
import Button from '@/components/Button/Button';
import { useT } from '@/i18n/useT';

interface NotFoundCardProps {
  onReset: () => void;
  text: string;
  buttonText: string;
}

function NotFoundCard({ onReset, text, buttonText }: NotFoundCardProps) {
  const { t } = useT();

  return (
    <li className={css.card}>
      <div className={css.content}>
        <h3 className={css.title}>{t('teachers.noTeachersFound')}</h3>
        <p className={css.description}>{text}</p>
      </div>
      <div className={css.buttonWrapper}>
        <Image
          className={css.girl}
          src="/not-found.webp"
          alt={t('teachers.notFoundImageAlt')}
          width={300}
          height={253}
          priority
        />
        <Button onClick={onReset} className={css.link}>
          {buttonText}
        </Button>
      </div>
    </li>
  );
}

export default NotFoundCard;
