import Icon from '@/components/Icon/Icon';
import css from './TeacherCardMeta.module.css';
import clsx from 'clsx';

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
  return (
    <ul className={clsx(css.list, className)}>
      <li className={css.item}>
        <Icon
          className={css.iconBook}
          name="book-open"
          width={16}
          height={16}
        />
        Lessons online
      </li>
      <li className={css.item}>Lessons done: {lessons_done}</li>
      <li className={css.item}>
        <Icon className={css.iconStar} name="star" width={16} height={16} />{' '}
        {rating}
      </li>
      <li className={css.item}>
        <span>
          Price / 1 hour: <span className={css.price}>{price}$</span>
        </span>
      </li>
    </ul>
  );
}

export default TeacherCardMeta;
