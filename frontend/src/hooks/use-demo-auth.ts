'use client';

import { useContext } from 'react';

import { AppStateContext } from '@/providers/app-state-provider';

export function useDemoAuth() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useDemoAuth must be used within AppStateProvider');
  }

  return context;
}
