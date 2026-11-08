import clsx from 'clsx';
import css from './TeacherCardLevels.module.css';

interface TeacherCardLevelsProps {
  levels: string[];
  className?: string;
}
function TeacherCardLevels({ levels, className }: TeacherCardLevelsProps) {
  return (
    <ul className={clsx(css.list, className)}>
      {levels.map((level, index) => (
        <li className={css.level} key={index}>
          #{level}
        </li>
      ))}
    </ul>
  );
}

export default TeacherCardLevels;
