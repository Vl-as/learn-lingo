'use client';

import css from './NotFoundPage.module.css';

import Container from '@/components/Container/Container';
import LinkButton from '@/components/LinkButton/LinkButton';
import Image from 'next/image';
import { useT } from '@/i18n/useT';

function NotFoundPage() {
  const { t } = useT();

  return (
    <main className={css.main}>
      <Container>
        <div className={css.wrapper}>
          <h1 className={css.title}>{t('notFound.title')}</h1>
          <div className={css.bottomWrapper}>
            <Image
              className={css.image}
              src="/not-found.webp"
              alt={t('notFound.imageAlt')}
              width={300}
              height={253}
              priority
            />
            <LinkButton href="/" className={css.link}>
              {t('notFound.home')}
            </LinkButton>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default NotFoundPage;
