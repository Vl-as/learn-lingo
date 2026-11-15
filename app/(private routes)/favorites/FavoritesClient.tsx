'use client';

import Container from '@/components/Container/Container';
import css from './FavoritesPage.module.css';
import { useAuth } from '@/hooks/useAuth';
import { getFavoriteTeachers } from '@/services/teachers';
import TeachersList from '@/components/TeachersList/TeachersList';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

function FavoritesClient() {
  const { user } = useAuth();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['favoriteTeachers', user?.uid],
    queryFn: ({ pageParam = 0 }) => getFavoriteTeachers(user!.uid, pageParam),
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: lastPage => lastPage.nextCursor,
  });

  const teachers = data?.pages.flatMap(page => page.teachers) ?? [];
  return (
    <main className={css.page}>
      <Container className={css.container}>
        <h1>Favorites</h1>
        <TeachersList
          teachers={teachers}
          hasNextPage={hasNextPage}
          onLoadMore={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          chosenLevel=""
          isError={isError}
          isLoading={isLoading}
        />
      </Container>
    </main>
  );
}

export default FavoritesClient;
