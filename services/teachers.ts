import { db } from '@/lib/firebase';
import { Teacher } from '@/types/teacher';
import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from 'firebase/database';

const PAGE_SIZE = 4;

export async function fetchTeachers(cursor?: string | null) {
  const q = cursor
    ? query(
        ref(db, 'teachers'),
        orderByKey(),
        startAfter(cursor),
        limitToFirst(PAGE_SIZE)
      )
    : query(ref(db, 'teachers'), orderByKey(), limitToFirst(PAGE_SIZE));

  const snapshot = await get(q);

  if (!snapshot.exists()) {
    return {
      teachers: [],
      nextCursor: null,
      hasMore: false,
    };
  }

  const teachers = Object.entries(snapshot.val()).map(([id, teacher]) => ({
    id,
    ...(teacher as Omit<Teacher, 'id'>),
  }));

  return {
    teachers,
    nextCursor: teachers.at(-1)?.id ?? null,
    hasMore: teachers.length === PAGE_SIZE,
  };
}
