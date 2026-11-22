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
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addFavorite, removeFavorite } from '@/services/favorites';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useT } from '@/i18n/useT';
import { localizeTeacher } from '@/i18n/localizeTeacher';
import { formatLanguage } from '@/i18n/dataLabels';

interface TeacherCardProps {
  teacher: Teacher;
  chosenLevel: string;
  isFavorite?: boolean;
}

type FavoriteTeachersPage = {
  teachers: Teacher[];
  nextCursor: number | null;
};

function TeacherCard({ teacher, chosenLevel, isFavorite }: TeacherCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { t, locale } = useT();
  const localized = localizeTeacher(teacher, locale);
  const notify = () => toast.info(t('toast.signInToSave'));

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
      await queryClient.cancelQueries({ queryKey: ['favoriteTeachers'] });

      const previousFavorites =
        queryClient.getQueryData<string[]>(favoritesKey) ?? [];

      const previousFavoriteTeachers = queryClient.getQueriesData<
        InfiniteData<FavoriteTeachersPage>
      >({ queryKey: ['favoriteTeachers'] });

      queryClient.setQueryData<string[]>(favoritesKey, old => {
        const current = old ?? [];
        return current.includes(teacher.id)
          ? current.filter(id => id !== teacher.id)
          : [...current, teacher.id];
      });

      if (isFavorite) {
        queryClient.setQueriesData<InfiniteData<FavoriteTeachersPage>>(
          { queryKey: ['favoriteTeachers'] },
          old =>
            old && {
              ...old,
              pages: old.pages.map(page => ({
                ...page,
                teachers: page.teachers.filter(item => item.id !== teacher.id),
              })),
            }
        );
      }

      return { previousFavorites, favoritesKey, previousFavoriteTeachers };
    },

    onError: (_error, _variables, context) => {
      if (context?.favoritesKey) {
        queryClient.setQueryData(
          context.favoritesKey,
          context.previousFavorites
        );
      }

      context?.previousFavoriteTeachers.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });

      toast.error(
        isFavorite
          ? t('toast.removeFavoriteFailed')
          : t('toast.saveFavoriteFailed')
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
            <p className={css.category}>{t('teachers.languages')}</p>
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
                ? t('teachers.removeFavorite', { name: fullName })
                : t('teachers.addFavorite', { name: fullName })
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
            <span className={css.textLabel}>{t('teachers.speaks')}</span>{' '}
            <span className={css.languages}>
              {teacher.languages
                .map(item => formatLanguage(item, locale))
                .join(', ')}
            </span>
          </p>
          <p className={css.text}>
            <span className={css.textLabel}>{t('teachers.lessonInfo')}</span>{' '}
            {localized.lesson_info}
          </p>
          <p className={css.text}>
            <span className={css.textLabel}>{t('teachers.conditions')}</span>{' '}
            {localized.conditions.join(' ')}
          </p>
        </div>
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className={css.additionalInfoButton}
          type="button"
          aria-expanded={isOpen}
        >
          {isOpen ? t('teachers.showLess') : t('teachers.readMore')}
        </button>
        {isOpen && (
          <div className={css.extraInformation}>
            <p className={css.description}>{localized.experience}</p>
            <TeacherCardReviews reviews={localized.reviews} />
          </div>
        )}
        <TeacherCardLevels levels={teacher.levels} chosenLevel={chosenLevel} />
        {isOpen && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className={css.bookButton}
          >
            {t('teachers.bookTrialLesson')}
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
