'use client';

import clsx from 'clsx';
import CountUp from 'react-countup';
import Container from '../Container/Container';
import css from './StatsSection.module.css';

const stats = [
  { amount: 32000, suffix: ' +', label: 'Experienced tutors' },
  { amount: 300000, suffix: ' +', label: '5-star tutor reviews' },
  { amount: 120, suffix: ' +', label: 'Subjects taught' },
  { amount: 200, suffix: ' +', label: 'Tutor nationalities' },
];

interface StatsSectionProps {
  className?: string;
}

function StatsSection({ className }: StatsSectionProps) {
  const getStartValue = (value: number) => {
    if (value < 500) return Math.max(0, value - 40);
    if (value < 5000) return Math.round(value * 0.9);
    return Math.round(value * 0.94);
  };

  return (
    <section className={clsx(css.stats, className)}>
      <Container>
        <div className={css.statsInner}>
          <ul className={css.list}>
            {stats.map(({ amount, suffix, label }) => (
              <li className={css.statItem} key={label}>
                <span className={css.amount}>
                  <CountUp
                    start={getStartValue(amount)}
                    end={amount}
                    duration={1.4}
                    separator=","
                    suffix={suffix}
                    useEasing
                    autoAnimate
                  />
                </span>
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
