import { Review } from '@/types/review';
import css from './ReviewItem.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import Icon from '@/components/Icon/Icon';

interface ReviewItemProps {
  review: Review;
  className?: string;
}

function ReviewItem({ review, className }: ReviewItemProps) {
  return (
    <li className={clsx(css.review, className)}>
      <div className={css.header}>
        <div className={css.avatarFrame}>
          <Image
            src="/avatar_stock.png"
            alt="Avatar image"
            width={44}
            height={44}
          />
        </div>
        <div>
          <p className={css.name}>{review.reviewer_name}</p>
          <p className={css.rating}>
            <Icon height={16} width={16} className={css.iconStar} name="star" />
            {review.reviewer_rating.toFixed(1)}
          </p>
        </div>
      </div>
      <p className={css.comment}>{review.comment}</p>
    </li>
  );
}

export default ReviewItem;
