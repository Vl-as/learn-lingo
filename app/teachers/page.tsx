import { Suspense } from 'react';
import CatalogPrerenderPage from './CatalogPrerenderPage';
import Loading from '../loading';

interface CatalogPageProps {
  searchParams: Promise<{
    language?: string;
    price?: string;
    level?: string;
  }>;
}

function CatalogPage({ searchParams }: CatalogPageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <CatalogPrerenderPage searchParams={searchParams} />
    </Suspense>
  );
}

export default CatalogPage;
