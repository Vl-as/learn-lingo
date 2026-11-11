import { db } from '@/lib/firebase';
import { Teacher } from '@/types/teacher';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
} from 'firebase/firestore';

const PAGE_SIZE = 4;

export async function fetchTeachers(
  cursor?: QueryDocumentSnapshot<DocumentData> | null
) {
  const teachersRef = collection(db, 'teachers');

  const q = cursor
    ? query(teachersRef, orderBy('name'), startAfter(cursor), limit(PAGE_SIZE))
    : query(teachersRef, orderBy('name'), limit(PAGE_SIZE));

  const snapshot = await getDocs(q);

  const teachers = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Teacher, 'id'>),
  }));

  return {
    teachers,
    nextCursor: snapshot.docs.at(-1) ?? null,
    hasMore: snapshot.docs.length === PAGE_SIZE,
  };
}
