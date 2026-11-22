'use client';

import clsx from 'clsx';
import css from './TeacherCardLevels.module.css';
import { useT } from '@/i18n/useT';
import { formatLevel } from '@/i18n/dataLabels';

interface TeacherCardLevelsProps {
  levels: string[];
  className?: string;
  chosenLevel: string;
}

function TeacherCardLevels({
  levels,
  className,
  chosenLevel,
}: TeacherCardLevelsProps) {
  const { locale } = useT();

  return (
    <ul className={clsx(css.list, className)}>
      {levels.map(level => (
        <li
          className={clsx(css.level, chosenLevel === level && css.chosenLevel)}
          aria-current={chosenLevel === level ? 'true' : undefined}
          key={level}
        >
          #{formatLevel(level, locale)}
        </li>
      ))}
    </ul>
  );
}

export default TeacherCardLevels;
