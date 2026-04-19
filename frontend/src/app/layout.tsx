import type { Metadata } from 'next';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
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
    <html lang={language}>
      <body suppressHydrationWarning>
        <AppStateProvider initialLanguage={language}>
          <div className="min-h-screen">
            <SiteHeader language={language} />
            <main>{children}</main>
            <SiteFooter language={language} />
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
