import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { DataModeSwitcher } from '@/components/education/data-mode-switcher';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';
import { getCatalogLoadResult } from '@/services/catalog-service';
import type { DataMode } from '@/types/catalog';

type PageProps = {
  searchParams: Promise<{ mode?: DataMode }>;
};

export default async function DataModesPage({ searchParams }: PageProps) {
  const language = await getCurrentLanguage();
  const { mode = 'mock' } = await searchParams;
  const [mockData, apiData, dbData] = await Promise.all([
    getCatalogLoadResult({ mode: 'mock', language }),
    getCatalogLoadResult({ mode: 'api', language }),
    getCatalogLoadResult({ mode: 'db', language }),
  ]);

  const cards = [mockData, apiData, dbData];

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow={t(language, 'Modos de datos', 'Data modes')}
        title="Mock versus API versus PostgreSQL"
        description={t(
          language,
          'Esta comparacion es central porque muchas personas nuevas ven datos en pantalla pero no distinguen de donde vienen realmente.',
          'This comparison is central because many new developers see data on screen but cannot tell where it really comes from.',
        )}
      />
      <div className="flex justify-end">
        <DataModeSwitcher currentMode={mode} />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.mode} className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
              {card.sourceLabel}
            </p>
            <h2 className="text-2xl font-semibold text-ink-950">
              {t(language, `Modo ${card.mode.toUpperCase()}`, `${card.mode.toUpperCase()} mode`)}
            </h2>
            <p className="text-sm leading-6 text-ink-700">{card.sourceSummary}</p>
            <div className="rounded-2xl border border-ink-900/10 bg-sand-50 p-4 text-sm text-ink-700">
              <p className="font-semibold text-ink-950">{t(language, 'Donde empieza', 'Where it starts')}</p>
              <code>{card.uiOrigin}</code>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink-900/10 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-700">
                  {t(language, 'Productos cargados', 'Products loaded')}
                </p>
                <p className="mt-2 text-3xl font-semibold text-ink-950">{card.products.length}</p>
              </div>
              <div className="rounded-2xl border border-ink-900/10 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-700">
                  {t(language, 'Categorias cargadas', 'Categories loaded')}
                </p>
                <p className="mt-2 text-3xl font-semibold text-ink-950">{card.categories.length}</p>
              </div>
            </div>
            {card.error ? (
              <div className="rounded-2xl border border-coral-500/20 bg-coral-500/10 px-4 py-3 text-sm text-coral-500">
                {card.error}
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
