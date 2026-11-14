'use client';

import Link from 'next/link';
import css from './Header.module.css';
import Icon from '../Icon/Icon';
import NavBar from './NavBar/NavBar';
import Container from '../Container/Container';
import Button from '../Button/Button';
import { useContext, useState } from 'react';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import Modal from '../Modal/Modal';
import LogInForm from '../LogInForm/LogInForm';
import { AuthContext } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '@/services/auth';

function Header() {
  const [isReg, setIsReg] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      console.log('Log out was success');
    },
    onError: () => {
      console.log('Log out fell');
    },
  });

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
            {user ? (
              <li>
                <Button onClick={() => mutate()}>Log out</Button>
              </li>
            ) : (
              <>
                <li>
                  <Button
                    className={css.logIn}
                    onClick={() => setIsLogIn(true)}
                  >
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
              </>
            )}
          </ul>
        </div>
      </Container>
      {isLogIn && (
        <Modal onClose={() => setIsLogIn(false)}>
          <LogInForm onSuccess={() => setIsLogIn(false)} />
        </Modal>
      )}
      {isReg && (
        <Modal onClose={() => setIsReg(false)}>
          <RegistrationForm onSuccess={() => setIsReg(false)} />
        </Modal>
      )}
    </header>
  );
}

export default Header;
