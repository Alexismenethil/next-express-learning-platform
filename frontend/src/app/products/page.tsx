import Link from 'next/link';

import { ProductGrid } from '@/components/catalog/product-grid';
import { DataModeSwitcher } from '@/components/education/data-mode-switcher';
import { DataSourceBanner } from '@/components/education/data-source-banner';
import { FileLocationCard } from '@/components/education/file-location-card';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';
import { getCatalogLoadResult } from '@/services/catalog-service';
import type { DataMode } from '@/types/catalog';

type PageProps = {
  searchParams: Promise<{
    mode?: DataMode;
    category?: string;
    search?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const language = await getCurrentLanguage();
  const { mode = 'mock', category, search } = await searchParams;
  const catalog = await getCatalogLoadResult({ mode, category, search, language });

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow={t(language, 'Catalogo', 'Catalog')}
        title={t(language, 'Explora el listado de productos', 'Explore the product listing')}
        description={t(
          language,
          'Esta vista muestra un listado limpio, filtros por categoria y el selector de origen de datos sin mezclar demasiada teoria en la misma pantalla.',
          'This view shows a clean listing, category filters, and the data-source selector without mixing too much theory into the same screen.',
        )}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <DataModeSwitcher currentMode={mode} />
        <div className="flex flex-wrap gap-3">
          {catalog.categories.map((item) => (
            <Link
              key={item.id}
              href={`/categories/${item.slug}?mode=${mode}`}
              className="rounded-full border border-ink-900/8 bg-white px-4 py-2 text-sm font-semibold text-ink-950"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <DataSourceBanner mode={mode} language={language} />

      {catalog.error ? (
        <Card className="border-coral-500/20 bg-coral-500/10 text-coral-500">{catalog.error}</Card>
      ) : (
        <ProductGrid products={catalog.products} mode={mode} language={language} />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <FileLocationCard
          language={language}
          title={t(language, 'Ruta del listado', 'List route file')}
          path="frontend/src/app/products/page.tsx"
          description={t(
            language,
            'Esta ruta lee parametros, llama al catalog service y delega el render a componentes reutilizables.',
            'This route reads params, calls the catalog service, and delegates rendering to reusable components.',
          )}
        />
        <FileLocationCard
          language={language}
          title={t(language, 'Grid reutilizable', 'Reusable card grid')}
          path="frontend/src/components/catalog/product-grid.tsx"
          description={t(
            language,
            'Las cards del catalogo viven fuera de la ruta para que puedan reutilizarse en mas de una pantalla.',
            'Catalog cards live outside the route so they can be reused in more than one screen.',
          )}
        />
      </div>
    </div>
  );
}
