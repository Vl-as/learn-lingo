import { Suspense } from 'react';
import CatalogPrerenderPage from './CatalogPrerenderPage';
import CatalogSkeleton from './CatalogSkeleton';

interface CatalogPageProps {
  searchParams: Promise<{
    language?: string;
    price?: string;
    level?: string;
  }>;
}

function CatalogPage({ searchParams }: CatalogPageProps) {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogPrerenderPage searchParams={searchParams} />
    </Suspense>
  );
}

export default CatalogPage;
