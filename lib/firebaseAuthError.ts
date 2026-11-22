import { FirebaseError } from 'firebase/app';
import type { TranslationKey } from '@/i18n/types';

const errorKeys: Record<string, TranslationKey> = {
  'auth/invalid-credential': 'auth.invalidCredentials',
  'auth/user-not-found': 'auth.invalidCredentials',
  'auth/wrong-password': 'auth.invalidCredentials',
  'auth/invalid-email': 'validation.emailInvalid',
  'auth/email-already-in-use': 'auth.emailAlreadyInUse',
  'auth/weak-password': 'auth.weakPassword',
  'auth/too-many-requests': 'auth.tooManyRequests',
  'auth/network-request-failed': 'auth.networkError',
};

export function getFirebaseAuthErrorKey(error: unknown): TranslationKey {
  if (!(error instanceof FirebaseError)) return 'auth.genericError';

  return errorKeys[error.code] ?? 'auth.genericError';
}
