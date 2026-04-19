'use client';

import { createContext, useSyncExternalStore } from 'react';

import type { Language } from '@/lib/i18n';

type AppStateContextValue = {
  isDemoAuthenticated: boolean;
  setDemoAuthenticated: (value: boolean) => void;
  language: Language;
};

export const AppStateContext = createContext<AppStateContextValue | null>(null);

const storageKey = 'learning-platform-demo-auth';

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(storageKey) === 'true';
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function AppStateProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: Language;
}) {
  const isDemoAuthenticated = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const value = {
    isDemoAuthenticated,
    language: initialLanguage,
    setDemoAuthenticated: (nextValue: boolean) => {
      window.localStorage.setItem(storageKey, String(nextValue));
      notifyListeners();
    },
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}
