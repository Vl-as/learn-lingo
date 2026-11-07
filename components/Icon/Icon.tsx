import clsx from 'clsx';
import css from './Icon.module.css';

interface IconProps {
  name: string;
  className?: string;
  width?: number;
  height?: number;
}

function Icon({ name, className, height = 20, width = 20 }: IconProps) {
  return (
    <svg width={width} height={height} className={clsx(css.icon, className)}>
      <use href={`/sprite.svg#icon-${name}`} />
    </svg>
  );
}

export default Icon;
