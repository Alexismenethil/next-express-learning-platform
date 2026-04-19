'use client';

import { usePathname } from 'next/navigation';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import type { Language } from '@/lib/i18n';

export function SiteFrame({
  language,
  children,
}: {
  language: Language;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminArea = pathname.startsWith('/admin');

  if (isAdminArea) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen">
      <SiteHeader language={language} />
      <main>{children}</main>
      <SiteFooter language={language} />
    </div>
  );
}
