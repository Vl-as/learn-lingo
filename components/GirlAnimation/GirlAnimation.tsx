'use client';

import { useEffect, useRef, useState } from 'react';
import css from './GirlAnimation.module.css';
import Image from 'next/image';
import clsx from 'clsx';
import { useT } from '@/i18n/useT';

const BLINK_DURATION = 160;
const WINK_DURATION = 450;

export default function GirlAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const winkTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const { t } = useT();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const canTrack = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!canTrack || reduceMotion) return;

    let frame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.hypot(deltaX, deltaY) / 35, 7);

        wrapper.style.setProperty('--px', `${Math.cos(angle) * distance}px`);
        wrapper.style.setProperty('--py', `${Math.sin(angle) * distance}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isWinking) return;

    let blinkTimer: ReturnType<typeof setTimeout>;
    let openTimer: ReturnType<typeof setTimeout>;

    const scheduleBlink = (delay: number) => {
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        openTimer = setTimeout(() => setIsBlinking(false), BLINK_DURATION);
        scheduleBlink(Math.random() * 3000 + 2500);
      }, delay);
    };

    scheduleBlink(3000);

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(openTimer);
    };
  }, [isWinking]);

  useEffect(() => {
    return () => clearTimeout(winkTimerRef.current);
  }, []);

  const handleCharacterClick = () => {
    if (isWinking) return;

    setIsBlinking(false);
    setIsWinking(true);
    winkTimerRef.current = setTimeout(() => setIsWinking(false), WINK_DURATION);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCharacterClick();
    }
  };

  return (
    <div
      className={css.card}
      onClick={handleCharacterClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={t('hero.makeTutorWink')}
    >
      <div ref={wrapperRef} className={css.characterWrapper}>
        <div className={clsx(css.headGroup, isWinking && css.headBounce)}>
          <div className={css.eyesContainer}>
            <div className={css.eyeSocket}>
              <div className={css.iris}>
                <div className={css.pupil} />
                <div className={css.glare} />
              </div>
              <div
                className={clsx(
                  css.eyelid,
                  (isBlinking || isWinking) && css.eyelidClosed
                )}
              />
            </div>

            <div className={css.eyeSocket}>
              <div className={css.iris}>
                <div className={css.pupil} />
                <div className={css.glare} />
              </div>
              <div
                className={clsx(css.eyelid, isBlinking && css.eyelidClosed)}
              />
            </div>
          </div>

          <Image
            width={300}
            height={253}
            src="/girl-transparent.webp"
            alt={t('hero.tutorHeadAlt')}
            className={css.head}
            priority
          />
        </div>
        <div
          className={css.laptop}
          role="img"
          aria-label={t('hero.laptopAlt')}
        />
      </div>
    </div>
  );
}
