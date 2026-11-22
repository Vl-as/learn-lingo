'use client';

import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { requestPasswordReset } from '@/services/auth';
import { translateMessage, useT } from '@/i18n/useT';
import css from './ResetPasswordForm.module.css';

interface ResetFormValues {
  email: string;
}

const schema = Yup.object({
  email: Yup.string()
    .trim()
    .email('resetPassword.emailInvalid')
    .required('resetPassword.emailRequired'),
});

interface ResetPasswordFormProps {
  onBack: () => void;
}

function ResetPasswordForm({ onBack }: ResetPasswordFormProps) {
  const { t, locale } = useT();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (_data, variables) => {
      setSentTo(variables.email);
    },
    onError: (error: FirebaseError, variables) => {
      switch (error.code) {
        case 'auth/user-not-found':
          setSentTo(variables.email);
          break;

        case 'auth/invalid-email':
          setError('email', {
            type: 'manual',
            message: 'resetPassword.emailInvalid',
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
            message: 'resetPassword.failed',
          });
      }
    },
  });

  const onSubmit = (data: ResetFormValues) => {
    mutate({ email: data.email.trim(), locale });
  };

  if (sentTo) {
    return (
      <div className={css.container}>
        <h2 className={css.title}>{t('resetPassword.sentTitle')}</h2>
        <p className={css.text}>
          {t('resetPassword.sentText', { email: sentTo })}
        </p>
        <Button className={css.button} onClick={onBack}>
          {t('resetPassword.backToLogin')}
        </Button>
      </div>
    );
  }

  const emailError = errors.email?.message;
  const rootError = errors.root?.message;
  const translatedRootError = translateMessage(rootError, t);

  return (
    <div className={css.container}>
      <h2 className={css.title}>{t('resetPassword.title')}</h2>
      <p className={css.text}>{t('resetPassword.text')}</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={isPending}>
          <Input
            autoComplete="email"
            placeholder={t('resetPassword.emailPlaceholder')}
            type="email"
            {...register('email')}
            error={emailError}
            className={css.inputField}
          />
          <Button disabled={isPending} className={css.button} type="submit">
            {isPending ? (
              <>
                <span>{t('resetPassword.sending')}</span>{' '}
                <span className={css.loader}></span>
              </>
            ) : (
              t('resetPassword.submit')
            )}
          </Button>
          {translatedRootError && (
            <span className={css.error}>{translatedRootError}</span>
          )}
          <button type="button" className={css.back} onClick={onBack}>
            {t('resetPassword.backToLogin')}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
