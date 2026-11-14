'use client';

import css from './TeachersList.module.css';
import TeacherCard from './TeacherCard/TeacherCard';
import Button from '../Button/Button';
import { Teacher } from '@/types/teacher';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '@/services/favorites';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

interface TeachersListProps {
  teachers: Teacher[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  chosenLevel: string;
}

function TeachersList({
  teachers,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  chosenLevel,
}: TeachersListProps) {
  const { user } = useContext(AuthContext);

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites', user?.uid],
    queryFn: getFavorites,
    enabled: !!user,
  });

  return (
    <>
      <ul className={css.list}>
        {teachers.map(teacher => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            chosenLevel={chosenLevel}
            isFavorite={favorites?.includes(teacher.id)}
          />
        ))}
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
