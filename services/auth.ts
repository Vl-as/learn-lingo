import { auth, db } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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

  await updateProfile(user, { displayName: name });

  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
  });

  return user;
}

export interface UpdateProfileData {
  name: string;
  photoURL?: string | null;
}

export async function updateUserProfile({ name, photoURL }: UpdateProfileData) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('User is not authenticated');
  }

  const trimmedName = name.trim();
  const nextPhotoURL = photoURL?.trim() || null;

  await updateProfile(currentUser, {
    displayName: trimmedName,
    photoURL: nextPhotoURL,
  });

  await setDoc(
    doc(db, 'users', currentUser.uid),
    {
      name: trimmedName,
      photoURL: nextPhotoURL,
    },
    { merge: true }
  );

  await currentUser.reload();

  return auth.currentUser;
}

export async function loginUser({ email, password }: LoginData) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function requestPasswordReset({
  email,
  locale,
}: {
  email: string;
  locale: string;
}) {
  auth.languageCode = locale;

  await sendPasswordResetEmail(auth, email);
}
