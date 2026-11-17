import Image from 'next/image';
import Container from '../Container/Container';
import css from './HeroSection.module.css';
import clsx from 'clsx';
import LinkButton from '../LinkButton/LinkButton';

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
        <div className={css.mediaBox}>
          <Image
            className={css.girlImage}
            src="/girl.webp"
            alt="Animated girl smiles"
            width={339}
            height={339}
            priority
          />
          <Image
            className={css.computerImage}
            src="/mac.webp"
            alt=""
            width={360}
            height={176}
            priority
          />
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
