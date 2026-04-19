import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { DataModeSwitcher } from '@/components/education/data-mode-switcher';
import { DataSourceBanner } from '@/components/education/data-source-banner';
import { FileLocationCard } from '@/components/education/file-location-card';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';
import { formatCurrency, formatDate } from '@/lib/utils';
import { getProductById } from '@/services/catalog-service';
import type { DataMode } from '@/types/catalog';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode?: DataMode }>;
};

export default async function ProductDetailPage({ params, searchParams }: PageProps) {
  const language = await getCurrentLanguage();
  const { id } = await params;
  const { mode = 'mock' } = await searchParams;
  const product = await getProductById(mode, id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-4">
        <div className="space-y-4 flex-1">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="bg-ink-100 text-ink-950 transition-colors hover:bg-ink-200">
              {product.categoryName}
            </Badge>
            <Badge variant={mode === 'db' ? 'coral' : mode === 'api' ? 'teal' : 'muted'} className="shadow-sm">
              {mode.toUpperCase()}
            </Badge>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-ink-950">{product.name}</h1>
          <p className="max-w-3xl text-xl leading-relaxed text-ink-600">{product.description}</p>
        </div>
        <div className="flex-shrink-0 mt-2 lg:mt-0">
          <DataModeSwitcher currentMode={mode} />
        </div>
      </div>

      {product.imageUrl && (
        <div className="relative w-full aspect-[21/9] overflow-hidden rounded-3xl bg-ink-50 shadow-2xl shadow-ink-900/10 mb-8 border border-ink-900/10 group">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/20 to-transparent opacity-60" />
        </div>
      )}

      <DataSourceBanner mode={mode} language={language} />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700">
                {t(language, 'Precio', 'Price')}
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink-950">{formatCurrency(product.price)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700">
                {t(language, 'Inventario', 'Inventory')}
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink-950">{product.inventory}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700">
                {t(language, 'Actualizado', 'Updated')}
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink-950">{formatDate(product.updatedAt)}</p>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-ink-950">
              {t(language, 'Por que esta pagina importa', 'Why this page matters')}
            </h2>
            <ul className="space-y-2 text-sm leading-6 text-ink-700">
              {product.learningNotes.map((note) => (
                <li key={note} className="rounded-2xl border border-ink-900/8 bg-sand-50 px-4 py-3">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="space-y-6">
          <FileLocationCard
            language={language}
            title={t(language, 'Ruta dinamica', 'Dynamic route')}
            path="frontend/src/app/products/[id]/page.tsx"
            description={t(
              language,
              'App Router interpreta la carpeta `[id]` como un segmento dinamico. Ese param se convierte en la entrada para buscar el producto.',
              'App Router interprets the `[id]` folder as a dynamic segment. That param becomes the input used to load the product.',
            )}
          />
          <FileLocationCard
            language={language}
            title={t(language, 'Endpoint del backend', 'Backend endpoint')}
            path="backend/src/modules/catalog/catalog.routes.ts"
            description={t(
              language,
              'En API o DB mode, esta pantalla termina llamando `GET /api/products/:id?mode=api|db` a traves del service del frontend.',
              'In API or DB mode, this screen ultimately calls `GET /api/products/:id?mode=api|db` through the frontend service layer.',
            )}
          />
        </div>
      </div>
    </div>
  );
}
