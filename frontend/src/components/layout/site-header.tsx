'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { LanguageToggle } from '@/components/layout/language-toggle';
import { getPrimaryNavigation } from '@/constants/navigation';
import { appConfig } from '@/lib/env';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n';

export function SiteHeader({ language }: { language: Language }) {
  const pathname = usePathname();
  const navigation = getPrimaryNavigation(language);

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-[rgba(255,250,242,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <div className="flex items-center gap-5">
          <Link href="/" className="space-y-1">
            <p className="text-lg font-semibold tracking-tight text-ink-950">{appConfig.name}</p>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-ink-700">
              {t(language, 'Starter educativo de onboarding', 'Educational onboarding starter')}
            </p>
          </Link>
          <Badge variant="muted">Next.js + Express + Prisma</Badge>
        </div>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? 'bg-white/90 text-ink-950 shadow-[0_10px_24px_rgba(16,33,42,0.05),inset_0_0_0_1px_rgba(16,33,42,0.07)]'
                    : 'text-ink-700 hover:bg-sand-50 hover:text-ink-950',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageToggle language={language} />
        </div>
      </div>
    </header>
  );
}
