'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import css from './RegistrationForm.module.css';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import PasswordField from '../PasswordField/PasswordField';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/services/auth';
import { getFirebaseAuthErrorKey } from '@/lib/firebaseAuthError';
import { useT, translateMessage } from '@/i18n/useT';
import GoogleButton from '../GoogleButton/GoogleButton';

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

const registrationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'validation.nameMin')
    .max(50, 'validation.nameMax')
    .required('validation.nameRequired'),

  email: Yup.string()
    .email('validation.emailInvalid')
    .required('validation.emailRequired'),

  password: Yup.string()
    .min(8, 'validation.passwordMin')
    .max(50, 'validation.passwordMax')
    .required('validation.passwordRequired'),
});

interface RegistrationFormProps {
  onSuccess: () => void;
}

function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const { t } = useT();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: unknown) => {
      const errorKey = getFirebaseAuthErrorKey(error);

      if (errorKey === 'auth.emailAlreadyInUse') {
        setError('email', {
          type: 'manual',
          message: errorKey,
        });
        return;
      }

      if (errorKey === 'auth.weakPassword') {
        setError('password', { type: 'manual', message: errorKey });
        return;
      }

      setError('root', {
        type: 'manual',
        message: errorKey,
      });
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    mutate(data);
  };
  const rootError = translateMessage(errors.root?.message, t);

  return (
    <div className={css.container}>
      <h2 className={css.title}>{t('auth.registerTitle')}</h2>
      <p className={css.text}>{t('auth.registerIntro')}</p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <Input
            autoComplete="name"
            placeholder={t('auth.namePlaceholder')}
            type="text"
            {...register('name')}
            error={errors.name?.message}
            className={css.inputField}
          />
          <Input
            autoComplete="email"
            placeholder={t('auth.emailPlaceholder')}
            type="email"
            {...register('email')}
            error={errors.email?.message}
            className={css.inputField}
          />
          <PasswordField
            autoComplete="new-password"
            placeholder={t('auth.passwordPlaceholder')}
            {...register('password')}
            error={errors.password?.message}
            className={css.inputField}
          />
          <Button disabled={isPending} className={css.button} type="submit">
            {isPending ? (
              <>
                <span>{t('auth.registerPending')}</span>{' '}
                <span className={css.loader}></span>
              </>
            ) : (
              t('auth.registerSubmit')
            )}
          </Button>
          {rootError && <span className={css.error}>{rootError}</span>}
        </fieldset>
      </form>
      <GoogleButton onSuccess={onSuccess} />
    </div>
  );
}

export default RegistrationForm;
