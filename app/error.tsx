'use client';

import Button from '@/components/Button/Button';
import css from './Error.module.css';
import Container from '@/components/Container/Container';
import Image from 'next/image';
import { useT } from '@/i18n/useT';

function Error({ reset }: { reset: () => void }) {
  const { t } = useT();

  return (
    <main className={css.main}>
      <Container>
        <div className={css.wrapper}>
          <h1 className={css.title}>{t('errors.generic')}</h1>
          <div className={css.bottomWrapper}>
            <Image
              className={css.image}
              src="/not-found.webp"
              alt={t('errors.imageAlt')}
              width={300}
              height={253}
            />
            <Button onClick={reset} className={css.button}>
              {t('errors.retry')}
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Error;
