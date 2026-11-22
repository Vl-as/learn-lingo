'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import Button from '../Button/Button';
import PasswordField from '../PasswordField/PasswordField';
import { changeUserPassword } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';
import { useT } from '@/i18n/useT';
import type { TranslationKey } from '@/i18n/types';
import { DEMO_EMAIL } from '@/data/demo';
import css from './ChangePasswordForm.module.css';
import Icon from '../Icon/Icon';

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const schema = Yup.object({
  currentPassword: Yup.string().required('changePassword.currentRequired'),
  newPassword: Yup.string()
    .min(8, 'changePassword.newMin')
    .max(50, 'changePassword.newMax')
    .notOneOf([Yup.ref('currentPassword')], 'changePassword.newSame')
    .required('changePassword.newRequired'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'changePassword.confirmMismatch')
    .required('changePassword.confirmRequired'),
});

interface ChangePasswordFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

function ChangePasswordForm({ onBack, onSuccess }: ChangePasswordFormProps) {
  const { t } = useT();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: changeUserPassword,
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: FirebaseError) => {
      switch (error.code) {
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('currentPassword', {
            type: 'manual',
            message: 'changePassword.currentWrong',
          });
          break;

        case 'auth/weak-password':
          setError('newPassword', {
            type: 'manual',
            message: 'changePassword.weak',
          });
          break;

        case 'auth/too-many-requests':
          setError('root', {
            type: 'manual',
            message: 'resetPassword.tooManyRequests',
          });
          break;

        case 'auth/network-request-failed':
          setError('root', {
            type: 'manual',
            message: 'resetPassword.networkError',
          });
          break;

        default:
          setError('root', {
            type: 'manual',
            message: 'changePassword.failed',
          });
      }
    },
  });

  const translate = (message?: string) =>
    message ? t(message as TranslationKey) : undefined;

  const onSubmit = (data: ChangePasswordValues) => {
    mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  if (user?.email === DEMO_EMAIL) {
    return (
      <div className={css.container}>
        <h2 className={css.title}>{t('changePassword.title')}</h2>
        <p className={css.text}>{t('changePassword.demoBlocked')}</p>
        <button type="button" className={css.back} onClick={onBack}>
          <svg
            className={css.backIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 12H5m0 0 7 7m-7-7 7-7" />
          </svg>
          <span className={css.backLabel}>{t('changePassword.back')}</span>
        </button>
      </div>
    );
  }

  const rootError = errors.root?.message;

  return (
    <div className={css.container}>
      <h2 className={css.title}>{t('changePassword.title')}</h2>
      <p className={css.text}>{t('changePassword.text')}</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={isPending}>
          <PasswordField
            autoComplete="current-password"
            placeholder={t('changePassword.currentPlaceholder')}
            {...register('currentPassword')}
            error={translate(errors.currentPassword?.message)}
            className={css.inputField}
          />
          <PasswordField
            autoComplete="new-password"
            placeholder={t('changePassword.newPlaceholder')}
            {...register('newPassword')}
            error={translate(errors.newPassword?.message)}
            className={css.inputField}
          />
          <PasswordField
            autoComplete="new-password"
            placeholder={t('changePassword.confirmPlaceholder')}
            {...register('confirmPassword')}
            error={translate(errors.confirmPassword?.message)}
            className={css.inputField}
          />
          <Button disabled={isPending} className={css.button} type="submit">
            {isPending ? (
              <>
                <span>{t('changePassword.saving')}</span>{' '}
                <span className={css.loader}></span>
              </>
            ) : (
              t('changePassword.submit')
            )}
          </Button>
          {rootError && (
            <span className={css.error}>{translate(rootError)}</span>
          )}
          <button type="button" className={css.back} onClick={onBack}>
            <Icon className={css.backIcon} name="arrow-back" width={18} height={18} />
            <span className={css.backLabel}>{t('changePassword.back')}</span>
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
