import StatsSection from '@/components/StatsSection/StatsSection';
import css from './HomePage.module.css';
import HeroSection from '@/components/HeroSection/HeroSection';

export default function HomePage() {
  return (
    <main className={css.page}>
      <HeroSection className={css.hero} />
      <StatsSection />
    </main>
  );
}
