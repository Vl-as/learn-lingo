import clsx from 'clsx';
import Container from '../Container/Container';
import css from './StatsSection.module.css';

const stats = [
  { amount: '32,000 +', label: 'Experienced tutors' },
  { amount: '300,000 +', label: '5-star tutor reviews' },
  { amount: '120 +', label: 'Subjects taught' },
  { amount: '200 +', label: 'Tutor nationalities' },
];

interface StatsSectionProps {
  className?: string;
}

function StatsSection({ className }: StatsSectionProps) {
  return (
    <section className={clsx(css.stats, className)}>
      <Container>
        <div className={css.statsInner}>
          <ul className={css.list}>
            {stats.map(({ amount, label }) => (
              <li className={css.statItem} key={`${amount}${label}`}>
                <span className={css.amount}>{amount}</span>
                <span className={css.label}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default StatsSection;
