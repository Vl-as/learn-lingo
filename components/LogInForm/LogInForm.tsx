import { yupResolver } from '@hookform/resolvers/yup';
import css from './LogInForm.module.css';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import PasswordField from '../PasswordField/PasswordField';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/auth';

interface LoginFormValues {
  email: string;
  password: string;
}

const LogInFormSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(50).required(),
});

interface LogInFormProps {
  onSuccess: () => void;
}

function LogInForm({ onSuccess }: LogInFormProps) {
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      onSuccess();
    },
    onError: error => {
      console.log(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LogInFormSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };
  return (
    <div className={css.container}>
      <h2 className={css.title}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
        <Button className={css.button} type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LogInForm;
