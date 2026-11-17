import css from './NotFoundPage.module.css';

import Container from '@/components/Container/Container';
import LinkButton from '@/components/LinkButton/LinkButton';
import Image from 'next/image';

function NotFoundPage() {
  return (
    <main className={css.main}>
      <Container>
        <div className={css.wrapper}>
          <h1 className={css.title}>Page not found</h1>
          <div className={css.bottomWrapper}>
            <Image
              className={css.image}
              src="/not-found.webp"
              alt="Page not found illustration"
              width={300}
              height={253}
            />
            <LinkButton href="/" className={css.link}>
              Home Page
            </LinkButton>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default NotFoundPage;
