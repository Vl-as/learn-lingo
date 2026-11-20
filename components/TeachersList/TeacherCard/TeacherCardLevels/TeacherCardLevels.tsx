import clsx from 'clsx';
import css from './TeacherCardLevels.module.css';

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
  return (
    <ul className={clsx(css.list, className)}>
      {levels.map(level => (
        <li
          className={clsx(css.level, chosenLevel === level && css.chosenLevel)}
          aria-current={chosenLevel === level ? 'true' : undefined}
          key={level}
        >
          #{level}
        </li>
      ))}
    </ul>
  );
}

export default TeacherCardLevels;
