import css from './CatalogPage.module.css';
import Container from '@/components/Container/Container';
import TeachersList from '@/components/TeachersList/TeachersList';

function CatalogPage() {
  return (
    <main className={css.page}>
      <Container className={css.container}>
        <TeachersList />
      </Container>
    </main>
  );
}

export default CatalogPage;
