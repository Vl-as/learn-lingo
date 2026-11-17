'use client';

import css from './TeachersList.module.css';
import TeacherCard from './TeacherCard/TeacherCard';
import Button from '../Button/Button';
import { Teacher } from '@/types/teacher';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '@/services/favorites';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import TeacherCardSkeleton from './TeacherCardSkeleton/TeacherCardSkeleton';
import NotFoundCard from './NotFoundCard/NotFoundCard';

interface TeachersListProps {
  teachers: Teacher[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  chosenLevel: string;
  isLoading: boolean;
  isError: boolean;
  onReset: () => void;
  buttonText: string;
  text: string;
}

function TeachersList({
  teachers,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  chosenLevel,
  isLoading,
  isError,
  onReset,
  buttonText,
  text,
}: TeachersListProps) {
  const { user } = useContext(AuthContext);

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites', user?.uid],
    queryFn: getFavorites,
    enabled: !!user,
  });

  if (isError) {
    <p>Something went wrong</p>;
  }

  return (
    <>
      <ul className={css.list}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <TeacherCardSkeleton key={i} />
          ))
        ) : teachers.length === 0 ? (
          <NotFoundCard buttonText={buttonText} text={text} onReset={onReset} />
        ) : (
          teachers.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              chosenLevel={chosenLevel}
              isFavorite={favorites?.includes(teacher.id)}
            />
          ))
        )}
      </ul>
      {hasNextPage && (
        <Button
          className={css.loadMore}
          disabled={isFetchingNextPage}
          onClick={() => onLoadMore()}
        >
          {isFetchingNextPage ? (
            <>
              <span>Loading</span>
              <span className={css.loader}></span>
            </>
          ) : (
            'Load more'
          )}
        </Button>
      )}
    </>
  );
}

export default TeachersList;
