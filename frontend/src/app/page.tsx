import Link from 'next/link';
import { ArrowRight, Component, Database, LayoutPanelLeft, Route } from 'lucide-react';

import { ProductGrid } from '@/components/catalog/product-grid';
import { DataSourceBanner } from '@/components/education/data-source-banner';
import { FileLocationCard } from '@/components/education/file-location-card';
import { DataModeSwitcher } from '@/components/education/data-mode-switcher';
import { InteractiveLearningPanel } from '@/components/education/interactive-learning-panel';
import { ButtonLink } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';
import { getCatalogLoadResult } from '@/services/catalog-service';
import type { DataMode } from '@/types/catalog';

type PageProps = {
  searchParams: Promise<{
    mode?: DataMode;
  }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const language = await getCurrentLanguage();
  const { mode = 'mock' } = await searchParams;
  const catalog = await getCatalogLoadResult({ mode, language });
  const featuredProducts = catalog.products.filter((product) => product.featured).slice(0, 3);

  const featureCards = [
    {
      title: t(language, 'App Router claro', 'Clear App Router'),
      description: t(
        language,
        'Layouts y rutas explicados sin ruido.',
        'Layouts and routes explained without noise.',
      ),
      icon: Route,
      href: '/architecture/app-router',
    },
    {
      title: t(language, 'Componentes bien separados', 'Well-separated components'),
      description: t(
        language,
        'UI reutilizable fuera de las rutas.',
        'Reusable UI outside the routes.',
      ),
      icon: Component,
      href: '/architecture/components',
    },
    {
      title: t(language, 'Comparacion de datos', 'Data comparison'),
      description: t(
        language,
        'Mock, API y DB con diferencias visibles.',
        'Mock, API, and DB with visible differences.',
      ),
      icon: Database,
      href: '/architecture/mock-vs-api-vs-db',
    },
    {
      title: t(language, 'Capas bien delimitadas', 'Clear stack layers'),
      description: t(
        language,
        'Frontend, backend y persistencia en capas claras.',
        'Frontend, backend, and persistence in clear layers.',
      ),
      icon: LayoutPanelLeft,
      href: '/architecture/backend',
    },
  ];

  return (
    <div className="surface-grid">
      <section className="mx-auto max-w-[1500px] px-6 pb-12 pt-16 lg:px-8 lg:pb-18 lg:pt-20">
        <div className="space-y-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:items-start">
            <div className="space-y-8 lg:sticky lg:top-28">
              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-600">
                  {t(language, 'Onboarding full-stack limpio y guiado', 'Clean, guided full-stack onboarding')}
                </p>
                <h1 className="max-w-4xl text-balance text-[clamp(3rem,4.8vw,5.4rem)] font-semibold leading-[0.94] tracking-tight text-ink-950">
                  {t(
                    language,
                    'Aprende arquitectura explorando, tocando y comparando el producto real.',
                    'Learn architecture by exploring, touching, and comparing the real product.',
                  )}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-ink-700">
                  {t(
                    language,
                    'Explora el producto, cambia la fuente de datos y entiende la arquitectura con una ruta mucho mas simple.',
                    'Explore the product, switch the data source, and understand the architecture through a much simpler flow.',
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`/products?mode=${mode}`}>
                  {t(language, 'Entrar al producto', 'Enter the product')}
                </ButtonLink>
                <ButtonLink href="/architecture" variant="secondary">
                  {t(language, 'Explorar arquitectura', 'Explore architecture')}
                </ButtonLink>
              </div>

              <Card className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-700">
                    {t(language, 'Modo de datos activo', 'Active data mode')}
                  </p>
                  <h2 className="text-xl font-semibold text-ink-950">
                    {t(
                      language,
                      'Prueba el mismo frontend con prototipo local, API real o PostgreSQL.',
                      'Try the same frontend with a local prototype, a real API, or PostgreSQL.',
                    )}
                  </h2>
                </div>
                <DataModeSwitcher currentMode={mode} />
              </Card>
            </div>

            <InteractiveLearningPanel language={language} mode={mode} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: t(language, 'Elige un foco', 'Pick a focus'),
                description: t(
                  language,
                  'Empieza por producto, datos o arquitectura.',
                  'Start with product, data, or architecture.',
                ),
              },
              {
                title: t(language, 'Compara rapido', 'Compare quickly'),
                description: t(
                  language,
                  'La misma UI cambia entre Mock, API y DB.',
                  'The same UI switches between Mock, API, and DB.',
                ),
              },
              {
                title: t(language, 'Ve lo importante', 'See what matters'),
                description: t(
                  language,
                  'Archivos, capas y decisiones clave del stack.',
                  'Files, layers, and key stack decisions.',
                ),
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(247,243,234,0.84)_100%)]"
              >
                <p className="text-sm font-semibold text-ink-950">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-ink-700">{item.description}</p>
              </Card>
            ))}
          </div>

          <div className="rounded-[28px] border border-white/75 bg-white/82 px-5 py-5 shadow-[0_18px_38px_rgba(16,33,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
              {t(language, 'Nota sobre el admin', 'Admin note')}
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-ink-700">
              {t(
                language,
                'El admin vive como area interna y se abre por ruta directa cuando quieras enseñar CRUD y acceso.',
                'The admin now lives as an internal area and opens through a direct route when you want to teach CRUD and access.',
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] space-y-6 px-6 py-6 lg:px-8">
        <DataSourceBanner mode={mode} language={language} />
        {catalog.error ? (
          <div className="rounded-[24px] border border-coral-500/20 bg-coral-500/10 px-6 py-4 text-sm text-coral-500">
            {catalog.error}
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-[1500px] space-y-8 px-6 py-10 lg:px-8">
        <SectionHeading
          eyebrow={t(language, 'Recorrido sugerido', 'Suggested tour')}
          title={t(
            language,
            'Tres caminos claros para entender el proyecto.',
            'Three clear paths for understanding the project.',
          )}
          description={t(
            language,
            'Empieza por el producto, compara datos y luego abre arquitectura.',
            'Start with the product, compare data, then open architecture.',
          )}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card) => (
            <Link key={card.title} href={card.href}>
              <Card className="flex h-full flex-col gap-4 transition hover:-translate-y-1">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-sand-50 text-teal-600">
                  <card.icon className="size-5" />
                </div>
                <h3 className="text-xl font-semibold text-ink-950">{card.title}</h3>
                <p className="text-sm leading-6 text-ink-700">{card.description}</p>
                <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-teal-600">
                  {t(language, 'Entrar', 'Open')}
                  <ArrowRight className="size-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] space-y-8 px-6 py-10 lg:px-8">
        <SectionHeading
          eyebrow={t(language, 'Productos destacados', 'Featured products')}
          title={t(
            language,
            'La UI no cambia cuando cambia la fuente.',
            'The UI does not change when the source changes.',
          )}
          description={t(
            language,
            'La misma interfaz funciona con datos mock, API o DB.',
            'The same interface works with mock, API, or DB data.',
          )}
        />
        <ProductGrid products={featuredProducts} mode={mode} language={language} />
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-6 px-6 py-10 lg:grid-cols-2 lg:px-8 lg:pb-20">
        <FileLocationCard
          language={language}
          title={t(language, 'Ruta principal', 'Home route')}
          path="frontend/src/app/page.tsx"
          description={t(
            language,
            'Aqui vive la estructura principal de la home.',
            'The main home structure lives here.',
          )}
        />
        <FileLocationCard
          language={language}
          title={t(language, 'Servicio del catalogo', 'Catalog service')}
          path="frontend/src/services/catalog-service.ts"
          description={t(
            language,
            'Aqui se decide si los datos vienen de mock, API o DB.',
            'This is where data switches between mock, API, or DB.',
          )}
        />
      </section>
    </div>
  );
}
