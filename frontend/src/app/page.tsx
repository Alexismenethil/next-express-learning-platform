import Link from 'next/link';
import { ArrowRight, Component, Database, LayoutPanelLeft, Route } from 'lucide-react';

import { ProductGrid } from '@/components/catalog/product-grid';
import { DataSourceBanner } from '@/components/education/data-source-banner';
import { EducationCallout } from '@/components/education/education-callout';
import { FileLocationCard } from '@/components/education/file-location-card';
import { DataModeSwitcher } from '@/components/education/data-mode-switcher';
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
        'Layouts, rutas dinamicas y route groups explicados con ejemplos visuales.',
        'Layouts, dynamic routes, and route groups explained with visual examples.',
      ),
      icon: Route,
      href: '/architecture/app-router',
    },
    {
      title: t(language, 'Componentes bien separados', 'Well-separated components'),
      description: t(
        language,
        'La UI reutilizable vive fuera de las rutas para que el proyecto escale con orden.',
        'Reusable UI lives outside the routes so the project scales cleanly.',
      ),
      icon: Component,
      href: '/architecture/components',
    },
    {
      title: t(language, 'Comparacion de datos', 'Data comparison'),
      description: t(
        language,
        'Mock, API y DB muestran con claridad que cambia y que se mantiene estable.',
        'Mock, API, and DB clearly show what changes and what stays stable.',
      ),
      icon: Database,
      href: '/architecture/mock-vs-api-vs-db',
    },
    {
      title: t(language, 'Admin didactico', 'Teaching admin'),
      description: t(
        language,
        'El panel admin explica forms, validation y persistencia sin meter auth real.',
        'The admin panel explains forms, validation, and persistence without real auth noise.',
      ),
      icon: LayoutPanelLeft,
      href: '/admin',
    },
  ];

  return (
    <div className="surface-grid">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-600">
                {t(language, 'Onboarding full-stack limpio y guiado', 'Clean, guided full-stack onboarding')}
              </p>
              <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-ink-950 md:text-6xl">
                {t(
                  language,
                  'Un catalogo real para aprender arquitectura sin ruido.',
                  'A real catalog for learning architecture without the noise.',
                )}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-ink-700">
                {t(
                  language,
                  'Explora el producto, cambia la fuente de datos y entra al recorrido de arquitectura con una experiencia mucho mas clara, visual e intuitiva.',
                  'Explore the product, switch the data source, and enter the architecture tour through a much clearer, more visual, and more intuitive experience.',
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/products?mode=${mode}`}>
                {t(language, 'Explorar catalogo', 'Explore catalog')}
              </ButtonLink>
              <ButtonLink href="/architecture" variant="secondary">
                {t(language, 'Ver guia de arquitectura', 'View architecture guide')}
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
                    'Cambia entre prototipo rapido, API real y persistencia con PostgreSQL.',
                    'Switch between rapid prototype, real API, and PostgreSQL persistence.',
                  )}
                </h2>
              </div>
              <DataModeSwitcher currentMode={mode} />
            </Card>
          </div>

          <Card className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-700">
              {t(language, 'Que resuelve este starter', 'What this starter solves')}
            </p>
            <EducationCallout
              label={t(language, 'Base real', 'Real foundation')}
              title={t(
                language,
                'Sirve para ensenar un stack moderno con un dominio sencillo.',
                'It teaches a modern stack through a simple, realistic domain.',
              )}
              description={t(
                language,
                'Catalogo, categorias, admin CRUD, Prisma y Docker viven dentro del mismo ejemplo para que el equipo vea el recorrido completo.',
                'Catalog, categories, admin CRUD, Prisma, and Docker live inside one example so the team can see the full journey.',
              )}
            />
            <EducationCallout
              label={t(language, 'Aprendizaje guiado', 'Guided learning')}
              title={t(
                language,
                'La arquitectura se explica dentro de la misma interfaz.',
                'The architecture is explained inside the interface itself.',
              )}
              description={t(
                language,
                'Las pantallas muestran origen de datos, ubicacion de archivos y decisiones de estructura sin saturar la vista.',
                'The screens show data origin, file locations, and structural decisions without overwhelming the view.',
              )}
            />
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-6 py-6 lg:px-8">
        <DataSourceBanner mode={mode} language={language} />
        {catalog.error ? (
          <div className="rounded-[24px] border border-coral-500/20 bg-coral-500/10 px-6 py-4 text-sm text-coral-500">
            {catalog.error}
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-10 lg:px-8">
        <SectionHeading
          eyebrow={t(language, 'Recorrido sugerido', 'Suggested tour')}
          title={t(
            language,
            'Tres caminos claros para entender el proyecto.',
            'Three clear paths for understanding the project.',
          )}
          description={t(
            language,
            'Empieza por el producto, compara las fuentes de datos y despues entra a la guia de arquitectura. Cada bloque esta pensado para enseñar una idea sin duplicar informacion.',
            'Start with the product, compare data sources, and then enter the architecture guide. Each block is designed to teach one idea without duplicating information.',
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

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-10 lg:px-8">
        <SectionHeading
          eyebrow={t(language, 'Productos destacados', 'Featured products')}
          title={t(
            language,
            'La UI no cambia cuando cambia la fuente.',
            'The UI does not change when the source changes.',
          )}
          description={t(
            language,
            'Las mismas cards renderizan datos mock, respuestas del API o registros persistidos. Esa estabilidad hace que la arquitectura sea mas facil de enseñar.',
            'The same cards render mock data, API responses, or persisted records. That stability makes the architecture easier to teach.',
          )}
        />
        <ProductGrid products={featuredProducts} mode={mode} language={language} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-2 lg:px-8 lg:pb-20">
        <FileLocationCard
          language={language}
          title={t(language, 'Ruta principal', 'Home route')}
          path="frontend/src/app/page.tsx"
          description={t(
            language,
            'Esta page organiza el hero, el selector de modo y los bloques de aprendizaje sin meter detalles de datos dentro de la UI.',
            'This page orchestrates the hero, mode switcher, and learning blocks without mixing data details into the UI.',
          )}
        />
        <FileLocationCard
          language={language}
          title={t(language, 'Servicio del catalogo', 'Catalog service')}
          path="frontend/src/services/catalog-service.ts"
          description={t(
            language,
            'Aqui se decide si el frontend debe leer mocks o llamar al backend, lo que mantiene la logica fuera de los route files.',
            'This is where the frontend decides whether to read mocks or call the backend, keeping that logic out of the route files.',
          )}
        />
      </section>
    </div>
  );
}
