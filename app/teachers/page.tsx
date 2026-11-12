import { Suspense } from 'react';
import CatalogPrerenderPage from './CatalogPrerenderPage';

interface CatalogPageProps {
  searchParams: Promise<{
    language?: string;
    price?: string;
    level?: string;
  }>;
}

async function CatalogPage({ searchParams }: CatalogPageProps) {
  return (
    <Suspense>
      <CatalogPrerenderPage searchParams={searchParams} />
    </Suspense>
  );
}

export default CatalogPage;
