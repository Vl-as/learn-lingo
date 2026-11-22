'use client';

import Container from '@/components/Container/Container';
import css from './FavoritesPage.module.css';
import { useAuth } from '@/hooks/useAuth';
import { getFavoriteTeachers } from '@/services/teachers';
import TeachersList from '@/components/TeachersList/TeachersList';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useT } from '@/i18n/useT';

function FavoritesClient() {
  const { user, loading } = useAuth();
  const { t } = useT();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [loading, user, router]);

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
    enabled: !!user,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: lastPage => lastPage.nextCursor,
  });

  const teachers = data?.pages.flatMap(page => page.teachers) ?? [];

  return (
    <main className={css.page}>
      <Container className={css.container}>
        <h1>{t('favorites.title')}</h1>
        <TeachersList
          teachers={teachers}
          hasNextPage={hasNextPage}
          onLoadMore={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          chosenLevel=""
          isError={isError}
          isLoading={loading || !user || isLoading}
          onReset={() => router.replace('/teachers')}
          buttonText={t('favorites.findTeachers')}
          text={t('favorites.empty')}
        />
      </Container>
    </main>
  );
}

export default FavoritesClient;
