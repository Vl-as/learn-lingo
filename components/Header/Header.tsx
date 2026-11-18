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
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import Image from 'next/image';

function Header() {
  const [modal, setModal] = useState<'login' | 'register' | null>(null);
  const { user, loading } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast('Logged out successfully');
    },
    onError: () => {
      toast.error('Logout failed');
    },
  });

  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerInner}>
          <Link className={css.logo} href="/">
            <div className={css.imageWrapper}>
              <Image src="/logo.png" alt="Logo" width={28} height={28} />
            </div>
            LearnLingo
          </Link>
          <NavBar className={css.navbar} />
          <ul className={css.authButtons}>
            {loading ? (
              <li className={css.placeholder} />
            ) : user ? (
              <li>
                <Button disabled={isPending} onClick={() => mutate()}>
                  {isPending ? 'Logging out...' : 'Log out'}
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Button
                    aria-label="Open login form"
                    className={css.logIn}
                    onClick={() => setModal('login')}
                  >
                    <Icon className={css.logInIcon} name="log-in" />
                    Log in
                  </Button>
                </li>
                <li>
                  <Button
                    aria-label="Open register form"
                    className={css.registration}
                    onClick={() => setModal('register')}
                  >
                    Registration
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </Container>
      {modal === 'login' && (
        <Modal onClose={() => setModal(null)}>
          <LogInForm onSuccess={() => setModal(null)} />
        </Modal>
      )}
      {modal === 'register' && (
        <Modal onClose={() => setModal(null)}>
          <RegistrationForm onSuccess={() => setModal(null)} />
        </Modal>
      )}
    </header>
  );
}

export default Header;
