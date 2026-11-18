import Container from '../Container/Container';
import css from './HeroSection.module.css';
import clsx from 'clsx';
import LinkButton from '../LinkButton/LinkButton';
import GirlAnimation from '../GirlAnimation/GirlAnimation';

interface HeroSectionProps {
  className?: string;
}

function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={clsx(css.hero, className)}>
      <Container className={css.heroInner}>
        <div className={css.content}>
          <h1 className={css.title}>
            Unlock your potential with the best{' '}
            <span className={css.accent}>
              <span className={css.accentText}>language</span>
              <span className={css.accentRectangle}></span>
            </span>{' '}
            tutors
          </h1>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <LinkButton href="/teachers" className={css.button}>
            Get started
          </LinkButton>
        </div>
        <GirlAnimation />
      </Container>
    </section>
  );
}

export default HeroSection;
