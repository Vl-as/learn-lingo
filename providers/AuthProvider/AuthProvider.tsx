'use client';

import { AuthContext } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ReactNode, useCallback, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

function cloneFirebaseUser(currentUser: User): User {
  const cloned = Object.create(Object.getPrototypeOf(currentUser)) as User;
  Object.assign(cloned, currentUser, {
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
  });
  return cloned;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const current = auth.currentUser;
    if (!current) {
      setUser(null);
      return;
    }

    await current.reload();
    const refreshed = auth.currentUser ?? current;
    setUser(cloneFirebaseUser(refreshed));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, nextUser => {
      setUser(nextUser ? cloneFirebaseUser(nextUser) : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext value={{ user, loading, refreshUser }}>{children}</AuthContext>
  );
}

export default AuthProvider;
