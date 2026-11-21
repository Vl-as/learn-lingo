'use client';

import css from './Header.module.css';
import Icon from '../Icon/Icon';
import NavBar from './NavBar/NavBar';
import Container from '../Container/Container';
import Button from '../Button/Button';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import Modal from '../Modal/Modal';
import LogInForm from '../LogInForm/LogInForm';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import Image from 'next/image';
import ProfileForm from '../ProfileForm/ProfileForm';
import AccentPicker from '../AccentPicker/AccentPicker';
import Logo from '../Logo/Logo';

function Header() {
  const [modal, setModal] = useState<'login' | 'register' | 'profile' | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (
        menuRef.current?.contains(event.target) ||
        menuToggleRef.current?.contains(event.target)
      ) {
        return;
      }

      setIsMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

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
          <Logo className={css.logo} />
          <button
            type="button"
            className={css.menuToggle}
            ref={menuToggleRef}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(open => !open)}
          >
            <span className={css.menuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <div
            id="mobile-navigation"
            ref={menuRef}
            className={clsx(
              css.mobileMenu,
              isMenuOpen && css.mobileMenuOpen
            )}
          >
            <NavBar
              className={css.navbar}
              onNavigate={() => setIsMenuOpen(false)}
            />
            <div className={css.headerActions}>
              <AccentPicker onOpen={() => setIsMenuOpen(false)} />
              <ul className={css.authButtons}>
                {loading ? (
                  <>
                    <li className={css.placeholder} />
                    <li className={css.placeholder} />
                  </>
                ) : user ? (
                  <>
                    <li>
                      <button
                        aria-label="Edit profile"
                        className={css.userButton}
                        type="button"
                        title={user.displayName || user.email || undefined}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setModal('profile');
                        }}
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
                        onClick={() => {
                          setIsMenuOpen(false);
                          mutate();
                        }}
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
                        onClick={() => {
                          setIsMenuOpen(false);
                          setModal('login');
                        }}
                      >
                        <Icon className={css.logInIcon} name="log-in" />
                        Log in
                      </Button>
                    </li>
                    <li>
                      <Button
                        aria-label="Open register form"
                        className={css.registration}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setModal('register');
                        }}
                      >
                        Registration
                      </Button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
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
