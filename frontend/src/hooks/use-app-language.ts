'use client';

import { useContext } from 'react';

import { AppStateContext } from '@/providers/app-state-provider';

export function useAppLanguage() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppLanguage must be used within AppStateProvider');
  }

  return context.language;
}
