'use client';

import { Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { cn } from '@/lib/utils';
import { languageCookieName } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

const options: Language[] = ['es', 'en'];

export function LanguageToggle({ language }: { language: Language }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-ink-900/10 bg-white p-1 shadow-[0_10px_30px_rgba(16,33,42,0.06)]">
      <span className="flex size-9 items-center justify-center rounded-full bg-sand-50 text-ink-700">
        <Languages className="size-4" />
      </span>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          disabled={isPending || option === language}
          onClick={() => {
            document.cookie = `${languageCookieName}=${option}; path=/; max-age=31536000; SameSite=Lax`;
            startTransition(() => {
              router.refresh();
            });
          }}
          className={cn(
            'rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition',
            option === language
              ? 'bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] text-sand-50 shadow-[0_12px_28px_rgba(16,33,42,0.18)]'
              : 'text-ink-700 hover:bg-sand-50 hover:text-ink-950',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
