import { auth, db } from '@/lib/firebase';
import { Filters } from '@/types/filters';
import { Teacher } from '@/types/teacher';
import {
  collection,
  getDocs,
  query,
  where,
  QueryConstraint,
  documentId,
} from 'firebase/firestore';

const PAGE_SIZE = 4;

export async function fetchTeachers(pageParam: number = 0, filters?: Filters) {
  const teachersRef = collection(db, 'teachers');
  const constraints: QueryConstraint[] = [];

  if (filters?.language) {
    constraints.push(where('languages', 'array-contains', filters.language));
  }

  const q = query(teachersRef, ...constraints);
  const snapshot = await getDocs(q);

  let teachers = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Teacher, 'id'>),
  }));

  if (filters?.price) {
    teachers = teachers.filter(
      teacher => Number(teacher.price_per_hour) <= Number(filters.price)
    );
  }

  if (filters?.level) {
    teachers = teachers.filter(teacher =>
      teacher.levels?.includes(filters.level!)
    );
  }

  const startIndex = pageParam * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const paginatedTeachers = teachers.slice(startIndex, endIndex);

  return {
    teachers: paginatedTeachers,
    nextPage: endIndex < teachers.length ? pageParam + 1 : undefined,
    hasMore: endIndex < teachers.length,
  };
}

export async function getFavoriteTeachers(
  uid: string,
  pageParam = 0,
  limit = PAGE_SIZE
): Promise<{
  teachers: Teacher[];
  nextCursor: number | null;
}> {
  const favoritesSnapshot = await getDocs(
    collection(db, 'users', uid, 'favorites')
  );

  const favoriteIds = favoritesSnapshot.docs.map(doc => doc.id);

  const pageIds = favoriteIds.slice(pageParam, pageParam + limit);

  if (!pageIds.length) {
    return {
      teachers: [],
      nextCursor: null,
    };
  }

  const teachersSnapshot = await getDocs(
    query(collection(db, 'teachers'), where(documentId(), 'in', pageIds))
  );

  const teachers = teachersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Teacher[];

  return {
    teachers,
    nextCursor:
      pageParam + limit < favoriteIds.length ? pageParam + limit : null,
  };
}
