import TeachersView from '@/components/TeachersView/TeachersView';
import css from './CatalogPage.module.css';
import Container from '@/components/Container/Container';

interface CatalogPrerenderPageProps {
  searchParams: Promise<{
    language?: string;
    price?: string;
    level?: string;
  }>;
}

async function CatalogPrerenderPage({ searchParams }: CatalogPrerenderPageProps) {
  const params = await searchParams;
  const selectedFilters = {
    language: params.language ?? '',
    level: params.level ?? '',
    price: params.price ?? '',
  };

  return (
    <main className={css.page}>
      <Container className={css.container}>
        <TeachersView selectedFilters={selectedFilters} />
      </Container>
    </main>
  );
}

export default CatalogPrerenderPage;
