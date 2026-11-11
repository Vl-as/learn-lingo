'use client';

import { fetchTeachers } from '@/services/teachers';
import Dropdown from '../Dropdown/Dropdown';
import TeachersList from '../TeachersList/TeachersList';
import css from './TeachersView.module.css';
import { useInfiniteQuery } from '@tanstack/react-query';
import TeacherCardSkeleton from '../TeachersList/TeacherCardSkeleton/TeacherCardSkeleton';
import { QueryDocumentSnapshot } from 'firebase/firestore';

const languages: string[] = [
  'French',
  'English',
  'German',
  'Ukrainian',
  'Polish',
];

const levels: string[] = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
];

const prices: string[] = ['10', '20', '30', '40'];

function TeachersView() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['teachers'],
    queryFn: ({ pageParam }) => fetchTeachers(pageParam),
    initialPageParam: null as QueryDocumentSnapshot | null,
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  const teachers = data?.pages.flatMap(page => page.teachers) ?? [];

  return (
    <>
      <ul className={css.filters}>
        <li>
          <Dropdown
            list={languages}
            initialValue="Language"
            label="Languages"
            className={css.languageFilter}
          />
        </li>
        <li>
          <Dropdown
            list={levels}
            initialValue="Level"
            label="Level of knowledge"
            className={css.levelFilter}
          />
        </li>
        <li>
          <Dropdown
            list={prices}
            initialValue="Price"
            label="Price"
            symbol="$"
            className={css.priceFilter}
          />
        </li>
      </ul>
      {!isError && teachers.length > 0 && (
        <TeachersList
          hasNextPage={hasNextPage}
          onLoadMore={fetchNextPage}
          teachers={teachers}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
      {isLoading && (
        <ul className={css.list}>
          {Array.from({ length: 4 }).map((_, i) => (
            <TeacherCardSkeleton key={i} />
          ))}
        </ul>
      )}
      {isError && <p>Something went wrong</p>}
    </>
  );
}

export default TeachersView;
