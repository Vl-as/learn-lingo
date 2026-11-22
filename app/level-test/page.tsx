import type { Metadata } from 'next';
import Container from '@/components/Container/Container';
import LevelTest from '@/components/LevelTest/LevelTest';
import css from './LevelTestPage.module.css';
import T from '@/i18n/T';

export const metadata: Metadata = {
  title: 'Language Level Test | Learn Lingo',
  description:
    'Take a quick 12-question test in English, German or French to find your approximate level and get matched with tutors.',
};

export default function LevelTestPage() {
  return (
    <main className={css.page}>
      <Container>
        <div className={css.intro}>
          <h1 className={css.title}>
            <T k="levelTest.pageTitleLead" />{' '}
            <span className={css.accent}>
              <T k="levelTest.pageTitleAccent" />
            </span>
          </h1>
          <p className={css.text}>
            <T k="levelTest.pageIntro" />
          </p>
        </div>
        <LevelTest />
      </Container>
    </main>
  );
}
