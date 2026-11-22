'use client';

import Container from '../Container/Container';
import css from './HeroSection.module.css';
import clsx from 'clsx';
import LinkButton from '../LinkButton/LinkButton';
import GirlAnimation from '../GirlAnimation/GirlAnimation';
import { useT } from '@/i18n/useT';

interface HeroSectionProps {
  className?: string;
}

function HeroSection({ className }: HeroSectionProps) {
  const { t } = useT();

  return (
    <section className={clsx(css.hero, className)}>
      <Container className={css.heroInner}>
        <div className={css.content}>
          <h1 className={css.title}>
            {t('hero.titleLead')}{' '}
            <span className={css.accent}>
              <span className={css.accentText}>
                {t('hero.titleAccent')}
              </span>
              <span className={css.accentRectangle}></span>
            </span>{' '}
            {t('hero.titleTail')}
          </h1>
          <p className={css.text}>{t('hero.description')}</p>
          <div className={css.actions}>
            <LinkButton href="/teachers" className={css.button}>
              {t('hero.getStarted')}
            </LinkButton>
            <LinkButton href="/level-test" className={css.secondary}>
              {t('hero.takeLevelTest')}
            </LinkButton>
          </div>
        </div>
        <GirlAnimation />
      </Container>
    </section>
  );
}

export default HeroSection;
