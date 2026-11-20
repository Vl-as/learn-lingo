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
import BookClassForm from '@/components/BookingForm/BookingForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from '@/services/favorites';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';

interface TeacherCardProps {
  teacher: Teacher;
  chosenLevel: string;
  isFavorite?: boolean;
}

function TeacherCard({ teacher, chosenLevel, isFavorite }: TeacherCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const notify = () =>
    toast.info(
      'Sign in or create an account to save teachers to your favorites.'
    );

  const fullName = `${teacher.name} ${teacher.surname}`;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        await removeFavorite(teacher.id);
      } else {
        await addFavorite(teacher.id);
      }
    },

    onMutate: async () => {
      const favoritesKey = ['favorites', user?.uid];
      await queryClient.cancelQueries({ queryKey: favoritesKey });

      const previousFavorites =
        queryClient.getQueryData<string[]>(favoritesKey) ?? [];

      queryClient.setQueryData<string[]>(favoritesKey, old => {
        const current = old ?? [];
        return current.includes(teacher.id)
          ? current.filter(id => id !== teacher.id)
          : [...current, teacher.id];
      });

      return { previousFavorites, favoritesKey };
    },

    onError: (_error, _variables, context) => {
      if (context?.favoritesKey) {
        queryClient.setQueryData(
          context.favoritesKey,
          context.previousFavorites
        );
      }

      toast.error(
        isFavorite
          ? 'Failed to remove teacher from favorites. Please try again.'
          : 'Failed to save teacher to favorites. Please try again.'
      );
    },

    onSettled: (_data, _error, _variables, context) => {
      queryClient.invalidateQueries({
        queryKey: context?.favoritesKey ?? ['favorites', user?.uid],
      });
      queryClient.invalidateQueries({
        queryKey: ['favoriteTeachers'],
      });
    },
  });

  const handleClick = () => {
    if (!user) {
      notify();
    } else {
      mutate();
    }
  };

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
            onClick={handleClick}
            disabled={isPending}
            aria-label={
              isFavorite
                ? `Remove ${fullName} from favorites`
                : `Add ${fullName} to favorites`
            }
            aria-pressed={Boolean(isFavorite)}
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
          type="button"
          aria-expanded={isOpen}
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
          <BookClassForm
            teacherId={teacher.id}
            fullName={fullName}
            avatar={teacher.avatar_url}
          />
        </Modal>
      )}
    </li>
  );
}

export default TeacherCard;
