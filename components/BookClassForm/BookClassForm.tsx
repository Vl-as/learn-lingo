import { useForm } from 'react-hook-form';
import css from './BookClassForm.module.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Input from '../Input/Input';
import Button from '../Button/Button';

const goals = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
];

const bookSchema = Yup.object({
  goal: Yup.string().required('Please select your learning goal.'),
  name: Yup.string()
    .trim()
    .min(2, 'Name must contain at least 2 characters.')
    .max(50, 'Name must contain at most 50 characters.')
    .required('Full name is required.'),
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  phone: Yup.string()
    .trim()
    .matches(/^\+?[0-9\s()-]{7,20}$/, 'Please enter a valid phone number.')
    .required('Phone number is required.'),
});

interface BookClassFormProps {
  avatar: string;
  fullName: string;
}

function BookClassForm({ avatar, fullName }: BookClassFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookSchema),
  });

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Book trial lesson</h2>
      <p className={css.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={css.teacherInfo}>
        <div className={css.avatarFrame}>
          <Image
            className={css.avatar}
            src={avatar}
            alt={`${fullName} avatar`}
            width={44}
            height={44}
          />
        </div>
        <div>
          <p className={css.label}>Your teacher</p>
          <p className={css.teacherName}>{fullName}</p>
        </div>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <p className={css.question}>
          What is your main reason for learning English?
        </p>
        <div className={css.radioButtons}>
          <ul className={css.list}>
            {goals.map((goal, index) => (
              <li key={index}>
                <label className={css.label}>
                  <input
                    className={css.radio}
                    type="radio"
                    {...register('goal')}
                  />
                  {goal}
                </label>
              </li>
            ))}
          </ul>
          {errors.goal && (
            <span className={css.error}>{errors.goal?.message}</span>
          )}
        </div>
        <Input
          className={css.inputField}
          placeholder="Full Name"
          type="text"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          className={css.inputField}
          placeholder="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          className={css.inputField}
          placeholder="Phone number"
          type="phone"
          {...register('phone')}
          error={errors.phone?.message}
        />

        <Button className={css.button} type="submit">
          Book
        </Button>
      </form>
    </div>
  );
}

export default BookClassForm;
