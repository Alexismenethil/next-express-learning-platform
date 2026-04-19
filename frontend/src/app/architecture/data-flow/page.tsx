import { FileLocationCard } from '@/components/education/file-location-card';
import { RequestFlow } from '@/components/education/request-flow';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function DataFlowPage() {
  const language = await getCurrentLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow={t(language, 'Flujo de datos', 'Data flow')}
        title={t(language, 'Desde un evento en la UI hasta la persistencia.', 'From UI event to persistence.')}
        description={t(
          language,
          'Esta pagina muestra la cadena que mas suele costar al inicio: a donde va un click, que archivo lo recibe despues y donde se toca la base de datos.',
          'This page shows the chain juniors usually struggle with most: where a click goes, which file handles it next, and where the database is actually touched.',
        )}
      />
      <RequestFlow
        language={language}
        title={t(language, 'Flujo de create y edit en admin', 'Admin create and edit flow')}
        steps={[
          {
            label: t(language, 'Formulario cliente', 'Client form'),
            description: t(
              language,
              'El componente del formulario admin junta valores y envia JSON a Express.',
              'The admin form component collects values and submits JSON to Express.',
            ),
          },
          {
            label: t(language, 'Ruta de Express', 'Express route'),
            description: t(
              language,
              'La ruta valida la entrada y luego pasa el request al service del catalogo.',
              'The route validates input, then forwards the request to the catalog service.',
            ),
          },
          {
            label: t(language, 'Cambio de repository', 'Repository switch'),
            description: t(
              language,
              'El service elige memoria o Prisma segun `?mode=api|db`.',
              'The service chooses memory or Prisma based on `?mode=api|db`.',
            ),
          },
          {
            label: t(language, 'Persistencia', 'Persistence'),
            description: t(
              language,
              'Prisma escribe en PostgreSQL en modo DB, mientras que el modo API solo modifica el repository en memoria.',
              'Prisma writes to PostgreSQL in DB mode, while API mode mutates only the in-memory repository.',
            ),
          },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <FileLocationCard
          language={language}
          title={t(language, 'Origen del submit en la UI', 'UI submit source')}
          path="frontend/src/components/admin/admin-product-form.tsx"
          description={t(
            language,
            'El formulario cliente es la primera frontera donde una interaccion del usuario se convierte en JSON estructurado.',
            'The client form is the first boundary where a user interaction becomes structured JSON.',
          )}
        />
        <FileLocationCard
          language={language}
          title={t(language, 'Origen de persistencia en backend', 'Backend persistence source')}
          path="backend/src/modules/catalog/prisma-catalog.repository.ts"
          description={t(
            language,
            'Aqui se aislan las escrituras a PostgreSQL para que el resto del backend no dependa del tipo de almacenamiento.',
            'This is where PostgreSQL writes are isolated so the rest of the backend stays storage-agnostic.',
          )}
        />
      </div>
    </div>
  );
}
