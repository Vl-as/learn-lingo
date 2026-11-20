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
import ProfileForm from '../ProfileForm/ProfileForm';

function Header() {
  const [modal, setModal] = useState<'login' | 'register' | 'profile' | null>(
    null
  );
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

  const handleProfileSuccess = () => {
    setModal(null);
    toast.success('Profile updated');
  };

  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerInner}>
          <Link className={css.logo} href="/">
            <div className={css.imageWrapper}>
              <Image src="/logo.webp" alt="Logo" width={28} height={28} />
            </div>
            LearnLingo
          </Link>
          <NavBar className={css.navbar} />
          <ul className={css.authButtons}>
            {loading ? (
              <li className={css.placeholder} />
            ) : user ? (
              <>
                <li>
                  <button
                    aria-label="Edit profile"
                    className={css.userButton}
                    type="button"
                    title={user.displayName || user.email || undefined}
                    onClick={() => setModal('profile')}
                  >
                    <Image
                      className={css.avatar}
                      src={user.photoURL ?? '/avatar_stock.webp'}
                      width={36}
                      height={36}
                      alt={
                        user.displayName
                          ? `${user.displayName} avatar`
                          : 'User avatar'
                      }
                    />
                    {(user.displayName || user.email) && (
                      <span className={css.userName}>
                        {user.displayName || user.email}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <Button
                    className={css.logOut}
                    disabled={isPending}
                    onClick={() => mutate()}
                  >
                    {isPending ? (
                      <>
                        <span>Logging out</span>
                        <span className={css.loader}></span>
                      </>
                    ) : (
                      'Log out'
                    )}
                  </Button>
                </li>
              </>
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
      {modal === 'profile' && user && (
        <Modal onClose={() => setModal(null)}>
          <ProfileForm
            key={`${user.uid}-${user.displayName ?? ''}-${user.photoURL ?? ''}`}
            user={user}
            onSuccess={handleProfileSuccess}
          />
        </Modal>
      )}
    </header>
  );
}

export default Header;
