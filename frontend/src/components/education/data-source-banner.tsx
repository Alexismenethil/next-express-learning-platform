import { DatabaseZap, Layers3, ToyBrick } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getModeSummary } from '@/services/catalog-service';
import { t } from '@/lib/i18n';
import type { DataMode } from '@/types/catalog';
import type { Language } from '@/lib/i18n';

const iconByMode = {
  mock: ToyBrick,
  api: Layers3,
  db: DatabaseZap,
} satisfies Record<DataMode, typeof ToyBrick>;

export function DataSourceBanner({ mode, language }: { mode: DataMode; language: Language }) {
  const summary = getModeSummary(mode, language);
  const Icon = iconByMode[mode];

  return (
    <Card className="flex flex-col gap-4 border-teal-600/8 bg-[linear-gradient(135deg,rgba(191,228,239,0.14)_0%,rgba(255,252,246,0.96)_38%,rgba(236,216,180,0.12)_100%)] md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl border border-white/70 bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] p-3 text-sand-50 shadow-[0_14px_30px_rgba(16,33,42,0.14)]">
          <Icon className="size-5" />
        </div>
        <div className="space-y-2">
          <Badge variant="coral">{summary.sourceLabel}</Badge>
          <h3 className="max-w-3xl text-lg font-semibold leading-7 text-ink-950">
            {summary.sourceSummary}
          </h3>
          <p className="text-sm leading-6 text-ink-700">
            {t(language, 'Referencia clave:', 'Teaching clue:')}{' '}
            <code className="rounded-full bg-white/80 px-2.5 py-1 font-mono text-[13px] text-ink-900 shadow-[inset_0_0_0_1px_rgba(16,33,42,0.07)]">
              {summary.uiOrigin}
            </code>
          </p>
        </div>
      </div>
    </Card>
  );
}
