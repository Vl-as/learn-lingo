'use client';

import Link from 'next/link';
import css from './NavBar.module.css';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: '/', label: 'Home' },
  { href: '/teachers', label: 'Teachers' },
];

interface NavBar {
  className?: string;
}

function NavBar({ className }: NavBar) {
  const path = usePathname();

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
      </ul>
    </nav>
  );
}

export default NavBar;
