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
import { useT, translateMessage } from '@/i18n/useT';
import type { TranslationKey } from '@/i18n/types';

const goals = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
] as const;

type BookingGoal = (typeof goals)[number];

const goalTranslationKeys: Record<BookingGoal, TranslationKey> = {
  'Career and business': 'booking.goals.career',
  'Lesson for kids': 'booking.goals.kids',
  'Living abroad': 'booking.goals.abroad',
  'Exams and coursework': 'booking.goals.exams',
  'Culture, travel or hobby': 'booking.goals.culture',
};

interface BookingFormValues {
  goal: string;
  name: string;
  email: string;
  phone: string;
}

const bookingSchema = Yup.object({
  goal: Yup.string().required('validation.goalRequired'),
  name: Yup.string()
    .trim()
    .min(2, 'validation.nameMin')
    .max(50, 'validation.nameMax')
    .required('validation.fullNameRequired'),
  email: Yup.string()
    .email('validation.emailInvalid')
    .required('validation.emailRequired'),
  phone: Yup.string()
    .trim()
    .matches(/^\+?[0-9\s()-]{7,20}$/, 'validation.phoneInvalid')
    .required('validation.phoneRequired'),
});

interface BookingFormProps {
  avatar: string;
  fullName: string;
  teacherId: string;
}

function BookingForm({ avatar, fullName, teacherId }: BookingFormProps) {
  const { user } = useAuth();
  const { t } = useT();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createBooking,
    onError: () => {
      setError('root', {
        type: 'manual',
        message: 'booking.requestFailed',
      });
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    mutate({ ...data, teacherId });
  };

  const goalError = translateMessage(errors.goal?.message, t);
  const rootError = translateMessage(errors.root?.message, t);

  if (isSuccess) {
    return (
      <>
        <Lottie
          className={css.animation}
          animationData={successAnimation}
          loop={false}
        />
        <h2 className={clsx(css.title, css.success)}>
          {t('booking.successTitle')}
        </h2>
        <p className={css.text}>
          {t('booking.successText', { name: fullName })}
        </p>
      </>
    );
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>{t('booking.title')}</h2>
      <p className={css.text}>{t('booking.description')}</p>
      <div className={css.teacherInfo}>
        <div className={css.avatarFrame}>
          <Image
            className={css.avatar}
            src={avatar}
            alt={t('booking.teacherAvatarAlt', { name: fullName })}
            width={44}
            height={44}
            priority
          />
        </div>
        <div>
          <p className={css.label}>{t('booking.teacherLabel')}</p>
          <p className={css.teacherName}>{fullName}</p>
        </div>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <p className={css.question}>
          {t('booking.goalQuestion')}
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
                  {t(goalTranslationKeys[goal])}
                </label>
              </li>
            ))}
          </ul>
          {goalError && <span className={css.error}>{goalError}</span>}
        </div>
        <Input
          className={css.inputField}
          placeholder={t('booking.fullNamePlaceholder')}
          type="text"
          defaultValue={user?.displayName ?? ''}
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          className={css.inputField}
          placeholder={t('auth.emailPlaceholder')}
          type="email"
          defaultValue={user?.email ?? ''}
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          className={css.inputField}
          placeholder={t('booking.phonePlaceholder')}
          type="tel"
          defaultValue={user?.phoneNumber ?? ''}
          {...register('phone')}
          error={errors.phone?.message}
        />

        <Button disabled={isPending} className={css.button} type="submit">
          {isPending ? (
            <>
              <span>{t('booking.pending')}</span>{' '}
              <span className={css.loader}></span>
            </>
          ) : (
            t('booking.submit')
          )}
        </Button>
        {rootError && <span className={css.error}>{rootError}</span>}
      </form>
    </div>
  );
}

export default BookingForm;
