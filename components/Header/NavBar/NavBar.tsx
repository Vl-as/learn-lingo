'use client';

import Link from 'next/link';
import css from './NavBar.module.css';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/teachers', label: 'Teachers' },
];

interface NavBar {
  className?: string;
}

function NavBar({ className }: NavBar) {
  const path = usePathname();
  const { user } = useContext(AuthContext);

  return (
    <nav className={className}>
      <ul className={css.list}>
        {links.map(({ href, label }) => (
          <li className={css.item} key={`${href}${label}`}>
            <Link
              className={clsx(css.link, href === path && css.currentPage)}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
        {user && (
          <li>
            <Link
              className={clsx(
                css.link,
                '/favorites' === path && css.currentPage
              )}
              href={'/favorites'}
            >
              Favorites
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
