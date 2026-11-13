'use client';

import Link from 'next/link';
import css from './Header.module.css';
import Icon from '../Icon/Icon';
import NavBar from './NavBar/NavBar';
import Container from '../Container/Container';
import Button from '../Button/Button';
import { useState } from 'react';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import Modal from '../Modal/Modal';
import LogInForm from '../LogInForm/LogInForm';

function Header() {
  const [isReg, setIsReg] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

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
              <Button className={css.logIn} onClick={() => setIsLogIn(true)}>
                <Icon className={css.logInIcon} name="log-in" />
                Log in
              </Button>
            </li>
            <li>
              <Button
                className={css.registration}
                onClick={() => setIsReg(true)}
              >
                Registration
              </Button>
            </li>
          </ul>
        </div>
      </Container>
      {isLogIn && (
        <Modal onClose={() => setIsLogIn(false)}>
          <LogInForm />
        </Modal>
      )}
      {isReg && (
        <Modal onClose={() => setIsReg(false)}>
          <RegistrationForm />
        </Modal>
      )}
    </header>
  );
}

export default Header;
