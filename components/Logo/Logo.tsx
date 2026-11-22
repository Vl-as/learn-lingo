'use client';

import css from './Logo.module.css';
import Image from 'next/image';
import { useAccent } from '@/hooks/useAccent';
import Link from 'next/link';
import clsx from 'clsx';

const logos = {
  sage: '/logo-sage.webp',
  sky: '/logo-sky.webp',
  peach: '/logo-peach.webp',
  lavender: '/logo-lavender.webp',
  rose: '/logo-rose.webp',
} as const;

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  const accent = useAccent();

  return (
    <Link className={clsx(css.logo, className)} href="/">
      <div className={css.imageWrapper}>
        <Image
          src={logos[accent]}
          alt=""
          width={32}
          height={32}
          unoptimized
        />
      </div>
      LearnLingo
    </Link>
  );
}
