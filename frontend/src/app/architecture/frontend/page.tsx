import { FolderTree } from '@/components/education/folder-tree';
import { FileLocationCard } from '@/components/education/file-location-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function FrontendArchitecturePage() {
  const language = await getCurrentLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow={t(language, 'Arquitectura del frontend', 'Frontend architecture')}
        title={t(
          language,
          'Por que la app de Next.js esta organizada asi.',
          'Why the Next.js app is organized this way.',
        )}
        description={t(
          language,
          'Los archivos de App Router viven en `src/app`, mientras que la UI reutilizable, los services y los mocks quedan fuera de las rutas para escalar con orden.',
          'App Router files live in `src/app`, while reusable UI, services, and mocks stay outside route folders so the codebase scales cleanly.',
        )}
      />
      <FolderTree
        title={t(language, 'Carpetas clave del frontend', 'Key frontend folders')}
        items={[
          {
            path: 'frontend/src/app',
            purpose: t(
              language,
              'Pages, layouts, loading states y segmentos de ruta. Mantiene los route files ligeros y enfocados en orquestacion.',
              'Pages, layouts, loading states, and route segments. Keep route files thin and orchestration-focused.',
            ),
          },
          {
            path: 'frontend/src/components',
            purpose: t(
              language,
              'UI reutilizable, widgets del catalogo y callouts educativos compartidos por varias rutas.',
              'Reusable UI, catalog widgets, and educational callouts shared by many routes.',
            ),
          },
          {
            path: 'frontend/src/services',
            purpose: t(
              language,
              'Es la frontera entre las paginas y la carga de datos. Aqui el modo mock cambia a API o DB.',
              'Boundary between pages and data loading. This is where mock mode switches into API or DB mode.',
            ),
          },
          {
            path: 'frontend/src/mocks',
            purpose: t(
              language,
              'Datos estaticos de ejemplo para prototipado rapido y demos de capacitacion.',
              'Static sample data for rapid prototyping and training demos.',
            ),
          },
          {
            path: 'frontend/src/providers',
            purpose: t(
              language,
              'Estado solo del cliente, como el interruptor de fake auth usado por el demo de admin.',
              'Client-only state such as the fake auth toggle used by the admin demo.',
            ),
          },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <FileLocationCard
          language={language}
          title={t(language, 'Ejemplo de UI reutilizable', 'Reusable UI example')}
          path="frontend/src/components/catalog/product-card.tsx"
          description={t(
            language,
            'Una sola card de producto sirve para home, listado del catalogo y referencias de arquitectura. Por eso no pertenece a una sola carpeta de ruta.',
            'One product card serves the home page, catalog list, and architecture references. That is why it does not belong under a single route folder.',
          )}
        />
        <FileLocationCard
          language={language}
          title={t(language, 'Ejemplo de frontera de service', 'Service boundary example')}
          path="frontend/src/services/catalog-service.ts"
          description={t(
            language,
            'Las paginas server component llaman este service en lugar de hacer fetch en muchos lugares. Eso centraliza la logica de modos de datos.',
            'Server component pages call this service instead of fetching data directly in many places. That centralizes the data-mode teaching logic.',
          )}
        />
      </div>
    </div>
  );
}
