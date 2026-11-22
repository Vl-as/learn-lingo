'use client';

import Icon from '@/components/Icon/Icon';
import css from './TeacherCardMeta.module.css';
import clsx from 'clsx';
import { useT } from '@/i18n/useT';

interface TeacherCardMetaProps {
  className?: string;
  lessons_done: number;
  rating: number;
  price: number;
}

function TeacherCardMeta({
  className,
  lessons_done,
  rating,
  price,
}: TeacherCardMetaProps) {
  const { t } = useT();

  return (
    <ul className={clsx(css.list, className)}>
      <li className={css.item}>
        <Icon
          className={css.iconBook}
          name="book-open"
          width={16}
          height={16}
        />
        {t('teachers.lessonsOnline')}
      </li>
      <li className={css.item}>
        {t('teachers.lessonsDone', { count: lessons_done })}
      </li>
      <li className={css.item}>
        <Icon
          aria-hidden="true"
          className={css.iconStar}
          name="star"
          width={16}
          height={16}
        />{' '}
        {rating}
      </li>
      <li className={css.item}>
        {t('teachers.pricePerHour')}{' '}
        <span className={css.price}>{price}$</span>
      </li>
    </ul>
  );
}

export default TeacherCardMeta;
