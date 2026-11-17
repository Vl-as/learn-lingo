import { yupResolver } from '@hookform/resolvers/yup';
import css from './LogInForm.module.css';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import PasswordField from '../PasswordField/PasswordField';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/auth';
import { FirebaseError } from 'firebase/app';

interface LoginFormValues {
  email: string;
  password: string;
}

const LogInFormSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),

  password: Yup.string().required('Password is required'),
});

interface LogInFormProps {
  onSuccess: () => void;
}

function LogInForm({ onSuccess }: LogInFormProps) {
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
    onError: (error: FirebaseError) => {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('root', {
            type: 'manual',
            message: 'Invalid email or password',
          });
          setError('email', {
            type: 'manual',
            message: ' ',
          });
          setError('password', {
            type: 'manual',
            message: ' ',
          });
          break;

        case 'auth/invalid-email':
          setError('email', {
            type: 'manual',
            message: 'Please enter a valid email address',
          });
          break;

        default:
          setError('root', {
            type: 'manual',
            message: 'Failed to sign in',
          });
      }
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };
  return (
    <div className={css.container}>
      <h2 className={css.title}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <Input
            autoComplete="email"
            placeholder="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            className={css.inputField}
          />
          <PasswordField
            autoComplete="current-password"
            placeholder="Password"
            {...register('password')}
            error={errors.password?.message}
            className={css.inputField}
          />
          <Button disabled={isPending} className={css.button} type="submit">
            {isPending ? (
              <>
                <span>Logging in</span> <span className={css.loader}></span>
              </>
            ) : (
              'Log In'
            )}
          </Button>
          {errors.root && (
            <span className={css.error}>{errors.root.message}</span>
          )}
        </fieldset>
      </form>
    </div>
  );
}

export default LogInForm;
