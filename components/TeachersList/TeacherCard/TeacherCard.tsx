import { Teacher } from '@/types/teacher';
import css from './TeacherCard.module.css';
import Image from 'next/image';
import TeacherCardMeta from './TeacherCardMeta/TeacherCardMeta';
import TeacherCardLevels from './TeacherCardLevels/TeacherCardLevels';
import TeacherCardReviews from './TeacherCardReviews/TeacherCardReviews';

interface TeacherCardProps {
  teacher: Teacher;
}

function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <li className={css.card} data-teacher-card>
      <div className={css.avatarFrame}>
        <Image
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width={96}
          height={96}
          className={css.avatar}
        />
      </div>
      <div className={css.content}>
        <div className={css.header}>
          <div>
            <p className={css.category}>Languages</p>
            <h3 className={css.name}>{`${teacher.name} ${teacher.surname}`}</h3>
          </div>
          <TeacherCardMeta
            lessons_done={teacher.lessons_done}
            rating={teacher.rating}
            price={teacher.price_per_hour}
            className={css.meta}
          />
        </div>
        <div className={css.details}>
          <p className={css.text}>
            <span className={css.textLabel}>Speaks:</span>{' '}
            <span className={css.languages}>
              {teacher.languages.join(', ')}
            </span>
          </p>
          <p className={css.text}>
            <span className={css.textLabel}>Lesson Info:</span>{' '}
            {teacher.lesson_info}
          </p>
          <p className={css.text}>
            <span className={css.textLabel}>Conditions:</span>{' '}
            {teacher.conditions}
          </p>
        </div>
        <div className={css.extraInformation}>
          <p className={css.description}>{teacher.experience}</p>
          <TeacherCardReviews reviews={teacher.reviews} />
        </div>
        <TeacherCardLevels levels={teacher.levels} />
      </div>
    </li>
  );
}

export default TeacherCard;
