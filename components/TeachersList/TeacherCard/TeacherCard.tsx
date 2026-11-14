'use client';

import { Teacher } from '@/types/teacher';
import css from './TeacherCard.module.css';
import Image from 'next/image';
import TeacherCardMeta from './TeacherCardMeta/TeacherCardMeta';
import TeacherCardLevels from './TeacherCardLevels/TeacherCardLevels';
import TeacherCardReviews from './TeacherCardReviews/TeacherCardReviews';
import Button from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon/Icon';
import Modal from '@/components/Modal/Modal';
import BookClassForm from '@/components/BookClassForm/BookClassForm';
import clsx from 'clsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from '@/services/favorites';

interface TeacherCardProps {
  teacher: Teacher;
  chosenLevel: string;
  isFavorite?: boolean;
}

function TeacherCard({ teacher, chosenLevel, isFavorite }: TeacherCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fullName = `${teacher.name} ${teacher.surname}`;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        await removeFavorite(teacher.id);
      } else {
        await addFavorite(teacher.id);
      }
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });

      const previousFavorites =
        queryClient.getQueryData<{ id: string }[]>(['favorites']) ?? [];

      queryClient.setQueryData<{ id: string }[]>(['favorites'], old => {
        old ??= [];

        const exists = old.some(f => f.id === teacher.id);

        return exists
          ? old.filter(f => f.id !== teacher.id)
          : [...old, { id: teacher.id }];
      });

      return { previousFavorites };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['favorites'], context?.previousFavorites);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
  });

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
          <button
            className={css.buttonFavorite}
            type="button"
            onClick={() => mutate()}
          >
            {isFavorite ? (
              <Icon
                width={26}
                height={26}
                className={css.iconHeartFull}
                name="heart-full"
              />
            ) : (
              <Icon
                name="heart-empty"
                width={26}
                height={26}
                className={css.iconHeart}
              />
            )}
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
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className={css.additionalInfoButton}
        >
          {isOpen ? 'Show less' : 'Read more'}
        </button>
        {isOpen && (
          <div className={css.extraInformation}>
            <p className={css.description}>{teacher.experience}</p>
            <TeacherCardReviews reviews={teacher.reviews} />
          </div>
        )}
        <TeacherCardLevels levels={teacher.levels} chosenLevel={chosenLevel} />
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
