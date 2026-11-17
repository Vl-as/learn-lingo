'use client';

import Button from '@/components/Button/Button';
import css from './Error.module.css';
import Container from '@/components/Container/Container';
import Image from 'next/image';

function Error({ reset }: { reset: () => void }) {
  return (
    <main className={css.main}>
      <Container>
        <div className={css.wrapper}>
          <h1 className={css.title}>Something went wrong</h1>
          <div className={css.bottomWrapper}>
            <Image
              className={css.image}
              src="/not-found.webp"
              alt="Error illustration"
              width={300}
              height={253}
            />
            <Button onClick={reset} className={css.button}>
              Try again
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Error;
