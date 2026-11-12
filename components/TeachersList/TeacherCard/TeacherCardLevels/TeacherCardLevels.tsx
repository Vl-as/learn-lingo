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
      {levels.map((level, index) => (
        <li
          className={clsx(css.level, chosenLevel === level && css.chosenLevel)}
          key={index}
        >
          #{level}
        </li>
      ))}
    </ul>
  );
}

export default TeacherCardLevels;
