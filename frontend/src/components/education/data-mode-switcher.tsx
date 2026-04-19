'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import type { DataMode } from '@/types/catalog';

const labels: Record<DataMode, string> = {
  mock: 'Mock',
  api: 'API',
  db: 'DB',
};

export function DataModeSwitcher({
  currentMode,
  allowedModes = ['mock', 'api', 'db'],
}: {
  currentMode: DataMode;
  allowedModes?: DataMode[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="inline-flex rounded-full border border-ink-900/10 bg-white p-1">
      {allowedModes.map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('mode', mode);
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
          }}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold transition',
            currentMode === mode
              ? 'bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] text-sand-50 shadow-[0_12px_28px_rgba(16,33,42,0.18)]'
              : 'text-ink-700 hover:bg-sand-100 hover:text-ink-950',
          )}
        >
          {labels[mode]}
        </button>
      ))}
    </div>
  );
}
