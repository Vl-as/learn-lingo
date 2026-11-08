'use client';

import { Teacher } from '@/types/teacher';
import css from './TeacherCard.module.css';
import Image from 'next/image';
import TeacherCardMeta from './TeacherCardMeta/TeacherCardMeta';
import TeacherCardLevels from './TeacherCardLevels/TeacherCardLevels';
import TeacherCardReviews from './TeacherCardReviews/TeacherCardReviews';
import Button from '@/components/Button/Button';
import { useState } from 'react';
import Icon from '@/components/Icon/Icon';
import Modal from '@/components/Modal/Modal';
import BookClassForm from '@/components/BookClassForm/BookClassForm';

interface TeacherCardProps {
  teacher: Teacher;
}

function TeacherCard({ teacher }: TeacherCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fullName = `${teacher.name} ${teacher.surname}`;

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
            <h3 className={css.name}>{fullName}</h3>
          </div>
          <TeacherCardMeta
            lessons_done={teacher.lessons_done}
            rating={teacher.rating}
            price={teacher.price_per_hour}
            className={css.meta}
          />
          <button className={css.buttonFavorite}>
            <Icon
              width={26}
              height={26}
              className={css.iconHeart}
              name="heart"
            />
          </button>
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
        {!isOpen && (
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className={css.moreButton}
          >
            Read more
          </button>
        )}
        {isOpen && (
          <div className={css.extraInformation}>
            <p className={css.description}>{teacher.experience}</p>
            <TeacherCardReviews reviews={teacher.reviews} />
          </div>
        )}
        <TeacherCardLevels levels={teacher.levels} />
        {isOpen && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className={css.bookButton}
          >
            Book trial lesson
          </Button>
        )}
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <BookClassForm fullName={fullName} avatar={teacher.avatar_url} />
        </Modal>
      )}
    </li>
  );
}

export default TeacherCard;
