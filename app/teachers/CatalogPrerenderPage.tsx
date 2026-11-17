import TeachersView from '@/components/TeachersView/TeachersView';
import css from './CatalogPage.module.css';
import Container from '@/components/Container/Container';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchTeachers } from '@/services/teachers';
import { TeachersResponse } from '@/types/teacher';
import { connection } from 'next/server';

interface CatalogPrerenderPageProps {
  searchParams: Promise<{
    language?: string;
    price?: string;
    level?: string;
  }>;
}

async function CatalogPrerenderPage({
  searchParams,
}: CatalogPrerenderPageProps) {
  const params = await searchParams;
  const selectedFilters = {
    language: params.language ?? '',
    level: params.level ?? '',
    price: params.price ?? '',
  };

  await connection();

  const queryClient = new QueryClient();

  await queryClient.infiniteQuery({
    queryKey: ['teachers', selectedFilters],

    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchTeachers(pageParam, selectedFilters),

    initialPageParam: 0,

    getNextPageParam: (lastPage: TeachersResponse) => lastPage.nextPage,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={css.page}>
        <Container className={css.container}>
          <TeachersView selectedFilters={selectedFilters} />
        </Container>
      </main>
    </HydrationBoundary>
  );
}

export default CatalogPrerenderPage;
