import { FolderTree } from '@/components/education/folder-tree';
import { FileLocationCard } from '@/components/education/file-location-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function ComponentsPage() {
  const language = await getCurrentLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow={t(language, 'Componentes', 'Components')}
        title={t(language, 'Que vive en components y por que.', 'What lives in components and why.')}
        description={t(
          language,
          'Este codebase separa la UI parecida a un design system, los widgets por feature y los route files para facilitar el crecimiento del proyecto.',
          'This codebase separates design-system-like UI, feature widgets, and route files to make the project easier to extend.',
        )}
      />
      <FolderTree
        title={t(language, 'Organizacion de componentes', 'Component organization')}
        items={[
          {
            path: 'src/components/ui',
            purpose: t(
              language,
              'Cards, badges y buttons primitivos que deberian poder reutilizarse en cualquier parte de la app.',
              'Primitive cards, badges, and buttons that should be reusable anywhere in the app.',
            ),
          },
          {
            path: 'src/components/catalog',
            purpose: t(
              language,
              'Widgets de productos y categorias especificos del dominio del catalogo.',
              'Product and category widgets specific to the catalog domain.',
            ),
          },
          {
            path: 'src/components/admin',
            purpose: t(
              language,
              'Clientes solo para admin, como la tabla CRUD, el form y el fake auth guard.',
              'Admin-only clients such as the CRUD table, form, and fake auth guard.',
            ),
          },
          {
            path: 'src/components/education',
            purpose: t(
              language,
              'Callouts, arboles de carpetas, tarjetas de ubicacion de archivos y bloques de flujo que ensenan arquitectura de forma visual.',
              'Callouts, folder trees, file-location cards, and request flow blocks that teach architecture visually.',
            ),
          },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <FileLocationCard
          language={language}
          title={t(language, 'Primitiva de UI compartida', 'Shared UI primitive')}
          path="frontend/src/components/ui/card.tsx"
          description={t(
            language,
            'La primitiva `card` mantiene la interfaz consistente sin introducir una libreria pesada de componentes.',
            'The card primitive makes the interface consistent without introducing a heavy component library.',
          )}
        />
        <FileLocationCard
          language={language}
          title={t(language, 'Widget educativo', 'Educational widget')}
          path="frontend/src/components/education/file-location-card.tsx"
          description={t(
            language,
            'Estas tarjetas convierten el producto en una guia interactiva de capacitacion, que es uno de los objetivos principales del repositorio.',
            'These cards turn the product into an interactive training guide, which is one of the key goals of the repository.',
          )}
        />
      </div>
    </div>
  );
}
