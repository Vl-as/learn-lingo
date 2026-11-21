'use client';

import Link from 'next/link';
import css from './NavBar.module.css';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { getFavoriteTeachers } from '@/services/teachers';
import { useAuth } from '@/hooks/useAuth';

const links = [
  { href: '/', label: 'Home' },
  { href: '/teachers', label: 'Teachers' },
];

interface NavBarProps {
  className?: string;
}

function NavBar({ className }: NavBarProps) {
  const path = usePathname();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const navLinks = user
    ? [...links, { href: '/favorites', label: 'Favorites' }]
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
                onMouseEnter={isFavorites ? prefetchFavorites : undefined}
                onFocus={isFavorites ? prefetchFavorites : undefined}
                onTouchStart={isFavorites ? prefetchFavorites : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
