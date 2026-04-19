import type { Metadata } from 'next';

import { SiteFrame } from '@/components/layout/site-frame';
import { getCurrentLanguage } from '@/lib/i18n-server';
import { AppStateProvider } from '@/providers/app-state-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Product Catalog Learning Platform',
  description:
    'An onboarding project that teaches Next.js, Express, Prisma, PostgreSQL, App Router, and data modes through a real catalog app.',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const language = await getCurrentLanguage();

  return (
    <html lang={language} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppStateProvider initialLanguage={language}>
          <SiteFrame language={language}>{children}</SiteFrame>
        </AppStateProvider>
      </body>
    </html>
  );
}
