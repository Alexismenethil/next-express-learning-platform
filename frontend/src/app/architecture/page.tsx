import Link from 'next/link';

import { ArchitectureExplorer } from '@/components/education/architecture-explorer';
import { getArchitectureNavigation } from '@/constants/navigation';
import { RequestFlow } from '@/components/education/request-flow';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function ArchitecturePage() {
  const language = await getCurrentLanguage();
  const navigation = getArchitectureNavigation(language);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow={t(language, 'Guia de arquitectura', 'Architecture guide')}
        title={t(
          language,
          'Un mapa interactivo para entender el stack sin memorizarlo.',
          'An interactive map for understanding the stack without memorizing it.',
        )}
        description={t(
          language,
          'Pulsa una capa, mira los archivos clave y abre la seccion cuando ya sepas que pregunta quieres responder.',
          'Tap a layer, inspect the key files, and open the section once you know which question you want to answer.',
        )}
      />

      <ArchitectureExplorer language={language} />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="flex h-full flex-col gap-4 transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(16,33,42,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
                {t(language, 'Guia', 'Guide')}
              </p>
              <h2 className="text-2xl font-semibold text-ink-950">{item.label}</h2>
              <p className="text-sm leading-6 text-ink-700">
                {t(
                  language,
                  'Abre esta seccion para ver decisiones, ubicacion de archivos y limites de arquitectura.',
                  'Open this section to see architectural decisions, file locations, and clear boundaries.',
                )}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <RequestFlow
        language={language}
        title={t(language, 'Orden sugerido del recorrido', 'Suggested walkthrough order')}
        steps={[
          {
            label: t(language, 'Ver el producto', 'See the product'),
            description: t(
              language,
              'Empieza por el catalogo real para darle contexto de negocio al repositorio.',
              'Start with the real catalog so the repository has business context.',
            ),
          },
          {
            label: t(language, 'Comparar datos', 'Compare data sources'),
            description: t(
              language,
              'Usa Mock, API y DB para ver como cambia la fuente sin romper la UI.',
              'Use Mock, API, and DB to see how the source changes without breaking the UI.',
            ),
          },
          {
            label: t(language, 'Entrar al admin', 'Enter the admin'),
            description: t(
              language,
              'Observa fake auth, forms, validation y el recorrido CRUD.',
              'Observe fake auth, forms, validation, and the CRUD journey.',
            ),
          },
          {
            label: t(language, 'Cerrar con docs', 'Finish with docs'),
            description: t(
              language,
              'Relaciona lo visto en la UI con la documentacion larga del proyecto.',
              'Connect what you saw in the UI with the longer-form project documentation.',
            ),
          },
        ]}
      />
    </div>
  );
}
