import { FolderTree } from '@/components/education/folder-tree';
import { FileLocationCard } from '@/components/education/file-location-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function AppRouterPage() {
  const language = await getCurrentLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow="App Router"
        title={t(language, 'Como se ensena el routing en este repo.', 'How routing is taught in this repo.')}
        description={t(
          language,
          'Este proyecto hace visibles los route files, layouts, segmentos dinamicos, route groups, loading states y el manejo de not-found.',
          'This project highlights route files, layouts, dynamic segments, route groups, loading states, and not-found handling in visible places.',
        )}
      />
      <FolderTree
        title={t(language, 'Convenciones de rutas usadas aqui', 'Route conventions used here')}
        items={[
          {
            path: 'src/app/layout.tsx',
            purpose: t(
              language,
              'Root layout compartido que envuelve cada pagina con el shell del sitio y el provider del demo.',
              'Shared root layout that wraps every page with the site shell and demo state provider.',
            ),
          },
          {
            path: 'src/app/(admin)/admin',
            purpose: t(
              language,
              'Un route group que mantiene aislados los layouts del admin sin cambiar la URL.',
              'A route group that keeps admin-specific layouts isolated without changing the URL path.',
            ),
          },
          {
            path: 'src/app/products/[id]/page.tsx',
            purpose: t(
              language,
              'Ruta dinamica de detalle de producto impulsada por un segmento entre corchetes.',
              'Dynamic product detail route powered by a folder segment in brackets.',
            ),
          },
          {
            path: 'src/app/products/loading.tsx',
            purpose: t(
              language,
              'Loading UI para ensenar feedback de suspense a nivel de ruta en App Router.',
              'Loading UI that teaches route-level suspense feedback in App Router.',
            ),
          },
          {
            path: 'src/app/not-found.tsx',
            purpose: t(
              language,
              'Pantalla compartida de fallback para rutas o productos que no existen.',
              'Shared fallback screen for missing routes or missing products.',
            ),
          },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <FileLocationCard
          language={language}
          title={t(language, 'Server component por defecto', 'Server component default')}
          path="frontend/src/app/products/page.tsx"
          description={t(
            language,
            'Esta pagina es un server component porque no necesita hooks del navegador. Puede hacer fetch de datos y renderizar HTML en el servidor.',
            'This page is a server component because it does not need browser hooks. It can fetch data directly and render HTML on the server.',
          )}
        />
        <FileLocationCard
          language={language}
          title={t(language, 'Ejemplo de client component', 'Client component example')}
          path="frontend/src/components/education/data-mode-switcher.tsx"
          description={t(
            language,
            'El switcher usa hooks del router, por eso vive detras de `use client` y fuera del route file.',
            'The switcher uses router hooks, so it explicitly lives behind `use client` and stays outside the route file.',
          )}
        />
      </div>
    </div>
  );
}
