import Link from 'next/link';
import css from './NavBar.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/teachers', label: 'Teachers' },
];

interface NavBar {
  className?: string;
}

function NavBar({ className }: NavBar) {
  return (
    <nav className={className}>
      <ul className={css.list}>
        {links.map(({ href, label }) => (
          <li className={css.item} key={`${href}${label}`}>
            <Link className={css.link} href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
