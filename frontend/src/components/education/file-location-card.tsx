import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

import { Card } from '@/components/ui/card';

export function FileLocationCard({
  title,
  path,
  description,
  language,
}: {
  title: string;
  path: string;
  description: string;
  language: Language;
}) {
  return (
    <Card className="space-y-4 border-ink-900/6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700">
        {t(language, 'Donde vive este archivo', 'Where this file lives')}
      </p>
      <h3 className="text-lg font-semibold text-ink-950">{title}</h3>
      <code className="block rounded-2xl border border-ink-900/8 bg-[linear-gradient(135deg,rgba(16,33,42,0.96)_0%,rgba(41,70,83,0.96)_100%)] px-4 py-3 font-mono text-sm text-sand-50 shadow-[0_14px_30px_rgba(16,33,42,0.12)]">
        {path}
      </code>
      <p className="text-sm leading-6 text-ink-700">{description}</p>
    </Card>
  );
}
