'use client';

import Link from 'next/link';
import css from './NavBar.module.css';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { getFavoriteTeachers } from '@/services/teachers';
import { useAuth } from '@/hooks/useAuth';
import { useT } from '@/i18n/useT';

const links = [
  { href: '/', label: 'navigation.home' },
  { href: '/teachers', label: 'navigation.teachers' },
] as const;

interface NavBarProps {
  className?: string;
  onNavigate?: () => void;
}

function NavBar({ className, onNavigate }: NavBarProps) {
  const path = usePathname();
  const { user } = useAuth();
  const { t } = useT();
  const queryClient = useQueryClient();

  const navLinks = user
    ? [...links, { href: '/favorites', label: 'navigation.favorites' as const }]
    : links;

  const prefetchFavorites = () => {
    if (!user) return;

    queryClient
      .infiniteQuery({
        queryKey: ['favoriteTeachers', user.uid],
        queryFn: ({ pageParam }) => getFavoriteTeachers(user.uid, pageParam),
        initialPageParam: 0,
        staleTime: 30_000,
      })
      .catch(() => {});
  };

  return (
    <nav className={className}>
      <ul className={css.list}>
        {navLinks.map(({ href, label }) => {
          const isFavorites = href === '/favorites';

          return (
            <li className={css.item} key={href}>
              <Link
                className={clsx(css.link, href === path && css.currentPage)}
                href={href}
                onClick={onNavigate}
                onMouseEnter={isFavorites ? prefetchFavorites : undefined}
                onFocus={isFavorites ? prefetchFavorites : undefined}
                onTouchStart={isFavorites ? prefetchFavorites : undefined}
              >
                {t(label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
