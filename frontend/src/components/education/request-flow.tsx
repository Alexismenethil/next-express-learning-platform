import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

import { Card } from '@/components/ui/card';

export function RequestFlow({
  title,
  steps,
  language,
}: {
  title: string;
  steps: Array<{ label: string; description: string }>;
  language: Language;
}) {
  return (
    <Card className="space-y-5">
      <h3 className="text-xl font-semibold text-ink-950">{title}</h3>
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className="rounded-3xl border border-white/70 bg-[linear-gradient(180deg,rgba(248,239,223,0.45)_0%,rgba(255,255,255,0.92)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
          >
            <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] text-sm font-semibold text-sand-50 shadow-[0_10px_24px_rgba(16,33,42,0.14)]">
              {index + 1}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
              {t(language, `Paso ${index + 1}`, `Step ${index + 1}`)}
            </p>
            <h4 className="mt-3 text-base font-semibold text-ink-950">{step.label}</h4>
            <p className="mt-2 text-sm leading-6 text-ink-700">{step.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
