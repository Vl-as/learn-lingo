'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './GirlAnimation.module.css';
import Image from 'next/image';

export default function GirlAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 35, 7);

      wrapperRef.current.style.setProperty(
        '--px',
        `${Math.cos(angle) * distance}px`
      );
      wrapperRef.current.style.setProperty(
        '--py',
        `${Math.sin(angle) * distance}px`
      );
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerBlink = () => {
      if (isWinking) return;
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);

      const nextBlink = Math.random() * 3000 + 2500;
      timeoutId = setTimeout(triggerBlink, nextBlink);
    };

    timeoutId = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timeoutId);
  }, [isWinking]);

  const handleCharacterClick = () => {
    if (isWinking) return;
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 450);
  };

  return (
    <div
      className={styles.card}
      onClick={handleCharacterClick}
      title="Click me!"
    >
      <div
        ref={wrapperRef}
        className={`${styles.characterWrapper} ${isWinking ? styles.headBounce : ''}`}
      >
        <div className={styles.eyesContainer}>
          <div className={styles.eyeSocket}>
            <div className={styles.iris}>
              <div className={styles.pupil} />
              <div className={styles.glare} />
            </div>
            <div
              className={`${styles.eyelid} ${
                isBlinking || isWinking ? styles.eyelidClosed : ''
              }`}
            />
          </div>

          <div className={styles.eyeSocket}>
            <div className={styles.iris}>
              <div className={styles.pupil} />
              <div className={styles.glare} />
            </div>
            <div
              className={`${styles.eyelid} ${
                isBlinking ? styles.eyelidClosed : ''
              }`}
            />
          </div>
        </div>

        <Image
          width={300}
          height={253}
          src="/girl-transparent.webp"
          alt="Tutor Head"
          className={styles.head}
          priority
        />
      </div>

      <Image
        width={339}
        height={339}
        src="/mac.webp"
        alt="Laptop"
        className={styles.laptop}
        priority
      />
    </div>
  );
}
