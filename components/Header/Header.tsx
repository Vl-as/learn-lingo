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
import { useT } from '@/i18n/useT';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';

function Header() {
  const [modal, setModal] = useState<
    'login' | 'register' | 'profile' | 'reset' | null
  >(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const { t } = useT();
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
      toast(t('toast.loggedOut'));
    },
    onError: () => {
      toast.error(t('toast.logoutFailed'));
    },
  });

  const handleProfileSuccess = () => {
    setModal(null);
    toast.success(t('toast.profileUpdated'));
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
            aria-label={
              isMenuOpen ? t('header.closeMenu') : t('header.openMenu')
            }
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
            className={clsx(css.mobileMenu, isMenuOpen && css.mobileMenuOpen)}
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
                        aria-label={t('header.editProfile')}
                        className={css.userButton}
                        type="button"
                        title={user.displayName || user.email || undefined}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setModal('profile');
                        }}
                      >
                        {user.photoURL ? (
                          <Image
                            className={css.avatar}
                            src={user.photoURL}
                            width={36}
                            height={36}
                            alt={
                              user.displayName
                                ? t('header.avatarAlt', {
                                    name: user.displayName,
                                  })
                                : t('header.userAvatarAlt')
                            }
                          />
                        ) : (
                          <div className={css.letterAvatar}>
                            {(
                              user.displayName?.[0] ??
                              user.email?.[0] ??
                              ''
                            ).toUpperCase()}
                          </div>
                        )}
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
                            <span>{t('header.loggingOut')}</span>
                            <span className={css.loader}></span>
                          </>
                        ) : (
                          t('header.logOut')
                        )}
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Button
                        aria-label={t('header.openLogin')}
                        className={css.logIn}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setModal('login');
                        }}
                      >
                        <Icon className={css.logInIcon} name="log-in" />
                        {t('header.logIn')}
                      </Button>
                    </li>
                    <li>
                      <Button
                        aria-label={t('header.openRegistration')}
                        className={css.registration}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setModal('register');
                        }}
                      >
                        {t('header.registration')}
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
          <LogInForm
            onSuccess={() => setModal(null)}
            onForgotPassword={() => setModal('reset')}
          />
        </Modal>
      )}
      {modal === 'reset' && (
        <Modal onClose={() => setModal(null)}>
          <ResetPasswordForm onBack={() => setModal('login')} />
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
