import clsx from 'clsx';
import Container from '@/components/Container/Container';
import TeacherCardSkeleton from '@/components/TeachersList/TeacherCardSkeleton/TeacherCardSkeleton';
import listCss from '@/components/TeachersList/TeachersList.module.css';
import viewCss from '@/components/TeachersView/TeachersView.module.css';
import css from './CatalogPage.module.css';
import skeletonCss from './CatalogSkeleton.module.css';

function CatalogSkeleton() {
  return (
    <main className={css.page}>
      <Container className={css.container}>
        <div className={viewCss.filtersWrapper}>
          <ul className={viewCss.filters}>
            <li className={clsx(viewCss.languageFilter, skeletonCss.filter)} />
            <li className={clsx(viewCss.levelFilter, skeletonCss.filter)} />
            <li className={clsx(viewCss.priceFilter, skeletonCss.filter)} />
          </ul>
        </div>
        <ul className={listCss.list}>
          {Array.from({ length: 4 }).map((_, i) => (
            <TeacherCardSkeleton key={`skeleton-${i}`} />
          ))}
        </ul>
      </Container>
    </main>
  );
}

export default CatalogSkeleton;
