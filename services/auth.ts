import { auth, db } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export async function registerUser({ name, email, password }: RegisterData) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
  });

  return user;
}

export async function loginUser({ email, password }: LoginData) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
}

export async function logoutUser() {
  await signOut(auth);
}
