'use client';

import clsx from 'clsx';
import CountUp from 'react-countup';
import Container from '../Container/Container';
import css from './StatsSection.module.css';
import { useT } from '@/i18n/useT';

const stats = [
  { amount: 32000, suffix: ' +', label: 'stats.experiencedTutors' },
  { amount: 300000, suffix: ' +', label: 'stats.tutorReviews' },
  { amount: 120, suffix: ' +', label: 'stats.subjectsTaught' },
  { amount: 200, suffix: ' +', label: 'stats.tutorNationalities' },
] as const;

interface StatsSectionProps {
  className?: string;
}

function StatsSection({ className }: StatsSectionProps) {
  const { t } = useT();
  const getStartValue = (value: number) => {
    if (value < 500) return Math.max(0, value - 40);
    if (value < 5000) return Math.round(value * 0.9);
    return Math.round(value * 0.94);
  };

  return (
    <section className={clsx(css.stats, className)}>
      <Container>
        <div className={css.statsInner}>
          <svg className={css.border} aria-hidden="true" focusable="false">
            <rect
              className={css.borderLine}
              x="0.5"
              y="0.5"
              width="calc(100% - 1px)"
              height="calc(100% - 1px)"
            />
          </svg>
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
                <span className={css.label}>{t(label)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default StatsSection;
