import { Review } from '@/types/review';
import css from './TeacherCardReviews.module.css';
import ReviewItem from './ReviewItem/ReviewItem';
import clsx from 'clsx';

interface TeacherCardReviewsProps {
  reviews: Review[];
  className?: string;
}
function TeacherCardReviews({ reviews, className }: TeacherCardReviewsProps) {
  return (
    <ul className={clsx(css.list, className)}>
      {reviews.map((review, index) => (
        <ReviewItem key={`${review.reviewer_name}${index}`} review={review} />
      ))}
    </ul>
  );
}

export default TeacherCardReviews;
