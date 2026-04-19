import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ProductGrid } from '@/components/catalog/product-grid';
import { DataModeSwitcher } from '@/components/education/data-mode-switcher';
import { Card } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';
import { getCatalogLoadResult } from '@/services/catalog-service';
import type { DataMode } from '@/types/catalog';

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: DataMode }>;
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const language = await getCurrentLanguage();
  const { slug } = await params;
  const { mode = 'mock' } = await searchParams;
  const catalog = await getCatalogLoadResult({ mode, category: slug, language });
  const category = catalog.categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <div className="relative mb-12 overflow-hidden rounded-[2.5rem] bg-ink-950 px-8 py-16 sm:px-12 sm:py-24 shadow-2xl">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover opacity-50 mix-blend-luminosity transition-transform duration-1000 ease-out hover:scale-105 hover:opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
              {t(language, 'Ruta por categoria', 'Category route')}
            </p>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-md">{category.name}</h1>
            <p className="max-w-2xl text-xl leading-relaxed text-ink-200 font-medium">{category.description}</p>
          </div>
          <div className="shrink-0 rounded-2xl bg-white/5 p-2 backdrop-blur-xl border border-white/10 shadow-xl">
            <DataModeSwitcher currentMode={mode} />
          </div>
        </div>
      </div>
      {catalog.error ? (
        <Card className="border-coral-500/20 bg-coral-500/10 text-coral-500">{catalog.error}</Card>
      ) : (
        <ProductGrid products={catalog.products} mode={mode} language={language} />
      )}
    </div>
  );
}
