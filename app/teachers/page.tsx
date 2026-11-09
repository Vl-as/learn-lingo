import TeachersView from '@/components/TeachersView/TeachersView';
import css from './CatalogPage.module.css';
import Container from '@/components/Container/Container';

function CatalogPage() {
  return (
    <main className={css.page}>
      <Container className={css.container}>
        <TeachersView />
      </Container>
    </main>
  );
}

export default CatalogPage;
