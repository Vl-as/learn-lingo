import { auth, db } from '@/lib/firebase';
import {
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  getDocs,
  collection,
} from 'firebase/firestore';

export async function getFavorites() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User is not authenticated');
  }

  const snapshot = await getDocs(
    collection(db, 'users', user.uid, 'favorites')
  );

  return snapshot.docs.map(doc => doc.id);
}

export async function addFavorite(teacherId: string) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User is not authenticated');
  }

  await setDoc(doc(db, 'users', user.uid, 'favorites', teacherId), {
    addedAt: serverTimestamp(),
  });
}

export async function removeFavorite(teacherId: string) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User is not authenticated');
  }

  await deleteDoc(doc(db, 'users', user.uid, 'favorites', teacherId));
}
