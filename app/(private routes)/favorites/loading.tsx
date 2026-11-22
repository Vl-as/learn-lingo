import Container from '@/components/Container/Container';
import TeacherCardSkeleton from '@/components/TeachersList/TeacherCardSkeleton/TeacherCardSkeleton';
import listCss from '@/components/TeachersList/TeachersList.module.css';
import css from './FavoritesPage.module.css';
import T from '@/i18n/T';

function FavoritesLoading() {
  return (
    <main className={css.page}>
      <Container className={css.container}>
        <h1>
          <T k="favorites.title" />
        </h1>
        <ul className={listCss.list}>
          {Array.from({ length: 4 }).map((_, i) => (
            <TeacherCardSkeleton key={`skeleton-${i}`} />
          ))}
        </ul>
      </Container>
    </main>
  );
}

export default FavoritesLoading;
