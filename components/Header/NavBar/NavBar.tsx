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

interface NavBarProps {
  className?: string;
}

function NavBar({ className }: NavBarProps) {
  const path = usePathname();
  const { user } = useContext(AuthContext);

  const navLinks = user
    ? [...links, { href: '/favorites', label: 'Favorites' }]
    : links;

  return (
    <nav className={className}>
      <ul className={css.list}>
        {navLinks.map(({ href, label }) => (
          <li className={css.item} key={href}>
            <Link
              className={clsx(css.link, href === path && css.currentPage)}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
