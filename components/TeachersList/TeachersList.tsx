'use client';

import css from './TeachersList.module.css';
import TeacherCard from './TeacherCard/TeacherCard';
import { fetchTeachers } from '@/services/teachers';
import Button from '../Button/Button';
import TeacherCardSkeleton from './TeacherCardSkeleton/TeacherCardSkeleton';
import { useInfiniteQuery } from '@tanstack/react-query';

function TeachersList() {
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
    initialPageParam: null as string | null,
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  const teachers = data?.pages.flatMap(page => page.teachers) ?? [];

  if (isLoading) {
    return (
      <ul className={css.list}>
        {Array.from({ length: 4 }).map((_, i) => (
          <TeacherCardSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (isError) {
    <p>Something went wrong</p>;
  }

  return (
    <>
      {teachers.length > 0 && (
        <ul className={css.list}>
          {teachers.map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </ul>
      )}
      {hasNextPage && (
        <Button
          className={css.loadMore}
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
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
