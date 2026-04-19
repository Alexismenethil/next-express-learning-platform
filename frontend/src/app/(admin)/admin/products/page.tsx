import { redirect } from 'next/navigation';

import { AdminProductsTable } from '@/components/admin/admin-products-table';
import { DataModeSwitcher } from '@/components/education/data-mode-switcher';
import { DataSourceBanner } from '@/components/education/data-source-banner';
import { FileLocationCard } from '@/components/education/file-location-card';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';
import { getCatalogLoadResult } from '@/services/catalog-service';
import type { DataMode } from '@/types/catalog';

type PageProps = {
  searchParams: Promise<{ mode?: DataMode }>;
};

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const language = await getCurrentLanguage();
  const { mode = 'api' } = await searchParams;

  if (mode === 'mock') {
    redirect('/admin/products?mode=api');
  }

  const catalog = await getCatalogLoadResult({ mode, language });
  const publishedCount = catalog.products.filter((product) => product.status === 'published').length;
  const featuredCount = catalog.products.filter((product) => product.featured).length;
  const draftCount = catalog.products.length - publishedCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-ink-950">
            {t(language, 'Productos de admin', 'Admin products')}
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-ink-700">
            {t(
              language,
              'El modo Mock se omite a proposito porque el CRUD de admin debe demostrar limites reales de backend. Usa API mode para mutaciones en memoria y DB mode para persistencia en PostgreSQL.',
              'Mock mode is intentionally omitted here because admin CRUD should demonstrate backend boundaries. Use API mode for in-memory mutations and DB mode for PostgreSQL persistence.',
            )}
          </p>
        </div>
        <DataModeSwitcher currentMode={mode} allowedModes={['api', 'db']} />
      </div>

      <DataSourceBanner mode={mode} language={language} />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: t(language, 'Total de productos', 'Total products'),
            value: String(catalog.products.length),
          },
          {
            label: t(language, 'Publicados', 'Published'),
            value: String(publishedCount),
          },
          {
            label: t(language, 'Drafts / destacados', 'Drafts / featured'),
            value: `${draftCount} / ${featuredCount}`,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[26px] border border-white/75 bg-white/86 px-5 py-5 shadow-[0_16px_38px_rgba(16,33,42,0.05)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">{item.value}</p>
          </div>
        ))}
      </div>
      <AdminProductsTable products={catalog.products} mode={mode} language={language} />

      <div className="grid gap-6 lg:grid-cols-2">
        <FileLocationCard
          language={language}
          title={t(language, 'Ruta del listado admin', 'Admin list route')}
          path="frontend/src/app/(admin)/admin/products/page.tsx"
          description={t(
            language,
            'Esta ruta sigue siendo un server component. Primero carga productos y luego delega las interacciones de la tabla a un client component.',
            'This route is still a server component. It loads products first, then delegates table interactions to a client component.',
          )}
        />
        <FileLocationCard
          language={language}
          title={t(language, 'Interacciones de delete y edit', 'Delete and edit interactions')}
          path="frontend/src/components/admin/admin-products-table.tsx"
          description={t(
            language,
            'Las acciones que mutan datos viven del lado cliente porque responden a eventos, llamadas fetch y refresh de rutas.',
            'Mutating actions are client-side because they handle user events, fetch calls, and route refresh behavior.',
          )}
        />
      </div>
    </div>
  );
}
