import type { Locale } from './types';
import type { Teacher } from '@/types/teacher';

export function localizeTeacher(teacher: Teacher, locale: Locale): Teacher {
  if (locale === 'en') return teacher;

  const translation = teacher.translations?.[locale];

  if (!translation) return teacher;

  return {
    ...teacher,
    lesson_info: translation.lesson_info || teacher.lesson_info,
    conditions:
      translation.conditions?.length === teacher.conditions.length
        ? translation.conditions
        : teacher.conditions,
    experience: translation.experience || teacher.experience,
    reviews: teacher.reviews.map((review, index) => ({
      ...review,
      comment: translation.reviews?.[index] || review.comment,
    })),
  };
}
