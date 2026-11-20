'use client';

import { useForm } from 'react-hook-form';
import css from './BookingForm.module.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '@/services/bookings';
import Lottie from 'lottie-react';
import successAnimation from '@/assets/animations/success.json';
import clsx from 'clsx';
import { useAuth } from '@/hooks/useAuth';

const goals = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
];

interface BookingFormValues {
  goal: string;
  name: string;
  email: string;
  phone: string;
}

const bookingSchema = Yup.object({
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

interface BookingFormProps {
  avatar: string;
  fullName: string;
  teacherId: string;
}

function BookingForm({ avatar, fullName, teacherId }: BookingFormProps) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createBooking,
    onError: () => {
      setError('root', {
        type: 'manual',
        message: 'Something went wrong. Try again later',
      });
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    mutate({ ...data, teacherId });
  };

  if (isSuccess) {
    return (
      <>
        <Lottie
          className={css.animation}
          animationData={successAnimation}
          loop={false}
        />
        <h2 className={clsx(css.title, css.success)}>Request sent!</h2>
        <p className={css.text}>
          {fullName} will contact you soon using the email address or phone
          number you provided.
        </p>
      </>
    );
  }

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
            priority
          />
        </div>
        <div>
          <p className={css.label}>Your teacher</p>
          <p className={css.teacherName}>{fullName}</p>
        </div>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <p className={css.question}>
          What is your main reason for learning a language?
        </p>
        <div className={css.radioButtons}>
          <ul className={css.list}>
            {goals.map((goal, index) => (
              <li key={goal}>
                <label className={css.label}>
                  <input
                    className={css.radio}
                    defaultChecked={index === 0}
                    type="radio"
                    value={goal}
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
          defaultValue={user?.displayName ?? ''}
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          className={css.inputField}
          placeholder="Email"
          type="email"
          defaultValue={user?.email ?? ''}
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          className={css.inputField}
          placeholder="Phone number"
          type="tel"
          defaultValue={user?.phoneNumber ?? ''}
          {...register('phone')}
          error={errors.phone?.message}
        />

        <Button disabled={isPending} className={css.button} type="submit">
          {isPending ? (
            <>
              <span>Booking</span> <span className={css.loader}></span>
            </>
          ) : (
            'Book'
          )}
        </Button>
        {errors.root && (
          <span className={css.error}>{errors.root?.message}</span>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
