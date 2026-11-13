import { yupResolver } from '@hookform/resolvers/yup';
import css from './RegistrationForm.module.css';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import PasswordField from '../PasswordField/PasswordField';

const registrationSchema = Yup.object({
  name: Yup.string().min(2).max(50).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(50).required(),
});

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = () => {
    console.log('submit');
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
          error={errors.email?.message}
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
        <Button className={css.button} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default RegistrationForm;
