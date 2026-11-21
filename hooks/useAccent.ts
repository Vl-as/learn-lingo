'use client';

import { useSyncExternalStore } from 'react';
import {
  ACCENT_STORAGE_KEY,
  DEFAULT_ACCENT,
  isAccentId,
  type AccentId,
} from '@/data/accents';

const listeners = new Set<() => void>();

export function subscribe(callback: () => void) {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
}

export function getSnapshot(): AccentId {
  const value = document.documentElement.dataset.accent;

  return isAccentId(value) ? value : DEFAULT_ACCENT;
}

export function getServerSnapshot(): AccentId {
  return DEFAULT_ACCENT;
}

export function applyAccent(id: AccentId) {
  document.documentElement.dataset.accent = id;

  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, id);
  } catch {}

  listeners.forEach(listener => listener());
}

export function useAccent() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
