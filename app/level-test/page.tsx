import type { Metadata } from 'next';
import Container from '@/components/Container/Container';
import LevelTest from '@/components/LevelTest/LevelTest';
import css from './LevelTestPage.module.css';

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
            Find your <span className={css.accent}>language level</span>
          </h1>
          <p className={css.text}>
            Pick English, German or French, answer 12 quick questions, and we
            will suggest tutors that match your level.
          </p>
        </div>
        <LevelTest />
      </Container>
    </main>
  );
}
