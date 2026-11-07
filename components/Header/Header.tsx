import Link from 'next/link';
import css from './Header.module.css';
import Icon from '../Icon/Icon';
import NavBar from './NavBar/NavBar';
import Container from '../Container/Container';
import Button from '../Button/Button';

function Header() {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerInner}>
          <Link className={css.logo} href="/">
            <Icon name="ukraine" width={28} height={28} />
            LearnLingo
          </Link>
          <NavBar className={css.navbar} />
          <ul className={css.authButtons}>
            <li>
              <Button className={css.logIn}>
                <Icon className={css.logInIcon} name="log-in" />
                Log in
              </Button>
            </li>
            <li>
              <Button className={css.registration}>Registration</Button>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
