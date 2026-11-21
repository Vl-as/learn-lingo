'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import css from './ScrollToTop.module.css';

const SHOW_AFTER = 400;

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > SHOW_AFTER);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={clsx(css.button, isVisible && css.visible)}
      onClick={handleClick}
      aria-label="Scroll to top"
    >
      <Icon className={css.icon} name="arrow-down" width={24} height={24} />
    </button>
  );
}

export default ScrollToTop;
