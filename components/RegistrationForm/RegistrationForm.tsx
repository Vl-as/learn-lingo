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
import { FirebaseError } from 'firebase/app';

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

const registrationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
});

interface RegistrationFormProps {
  onSuccess: () => void;
}

function RegistrationForm({ onSuccess }: RegistrationFormProps) {
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
    onError: (error: FirebaseError) => {
      if (error.code === 'auth/email-already-in-use') {
        setError('email', {
          type: 'manual',
          message: 'This email is already in use',
        });
        return;
      }

      setError('email', {
        type: 'manual',
        message: 'Something went wrong',
      });
    },
  });

  const onSubmit = (data: RegistrationFormValues) => {
    mutate(data);
  };
  return (
    <div className={css.container}>
      <h2 className={css.title}>Registration</h2>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Name"
          type="name"
          {...register('name')}
          error={errors.name?.message}
          className={css.inputField}
        />
        <Input
          placeholder="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          className={css.inputField}
        />
        <PasswordField
          placeholder="Password"
          {...register('password')}
          error={errors.password?.message}
          className={css.inputField}
        />
        <Button disabled={isPending} className={css.button} type="submit">
          {isPending ? (
            <>
              <span>Signing up</span> <span className={css.loader}></span>
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
      </form>
    </div>
  );
}

export default RegistrationForm;
