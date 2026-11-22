'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import css from './LogInForm.module.css';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import PasswordField from '../PasswordField/PasswordField';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/auth';
import { getFirebaseAuthErrorKey } from '@/lib/firebaseAuthError';
import { useT, translateMessage } from '@/i18n/useT';

interface LoginFormValues {
  email: string;
  password: string;
}

const LogInFormSchema = Yup.object({
  email: Yup.string()
    .email('validation.emailInvalid')
    .required('validation.emailRequired'),

  password: Yup.string().required('validation.passwordRequired'),
});

interface LogInFormProps {
  onSuccess: () => void;
  onForgotPassword: () => void;
}

function LogInForm({ onSuccess, onForgotPassword }: LogInFormProps) {
  const { t } = useT();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(LogInFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: unknown) => {
      const errorKey = getFirebaseAuthErrorKey(error);

      if (errorKey === 'auth.invalidCredentials') {
        setError('root', { type: 'manual', message: errorKey });
        setError('email', { type: 'manual', message: ' ' });
        setError('password', { type: 'manual', message: ' ' });
      } else if (errorKey === 'validation.emailInvalid') {
        setError('email', { type: 'manual', message: errorKey });
      } else {
        setError('root', {
          type: 'manual',
          message:
            errorKey === 'auth.genericError' ? 'auth.signInFailed' : errorKey,
        });
      }
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };
  const rootError = translateMessage(errors.root?.message, t);

  return (
    <div className={css.container}>
      <h2 className={css.title}>{t('auth.loginTitle')}</h2>
      <p className={css.text}>{t('auth.loginIntro')}</p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <Input
            autoComplete="email"
            placeholder={t('auth.emailPlaceholder')}
            type="email"
            {...register('email')}
            error={errors.email?.message}
            className={css.inputField}
          />
          <PasswordField
            autoComplete="current-password"
            placeholder={t('auth.passwordPlaceholder')}
            {...register('password')}
            error={errors.password?.message}
            className={css.inputField}
          />
          <Button disabled={isPending} className={css.button} type="submit">
            {isPending ? (
              <>
                <span>{t('auth.loginPending')}</span>{' '}
                <span className={css.loader}></span>
              </>
            ) : (
              t('auth.loginSubmit')
            )}
          </Button>
          {rootError && <span className={css.error}>{rootError}</span>}
          <button
            type="button"
            className={css.forgot}
            onClick={onForgotPassword}
          >
            {t('auth.forgotPassword')}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default LogInForm;
