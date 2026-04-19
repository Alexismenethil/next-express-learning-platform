import { FolderTree } from '@/components/education/folder-tree';
import { RequestFlow } from '@/components/education/request-flow';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function BackendArchitecturePage() {
  const language = await getCurrentLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow={t(language, 'Arquitectura del backend', 'Backend architecture')}
        title={t(language, 'Express, validation, services y repositories', 'Express, validation, services, and repositories')}
        description={t(
          language,
          'El backend es modular a proposito para separar HTTP, logica de negocio y acceso a datos.',
          'The backend is intentionally modular so learners can separate HTTP concerns from business logic and from database access.',
        )}
      />
      <FolderTree
        title={t(language, 'Carpetas clave del backend', 'Key backend folders')}
        items={[
          {
            path: 'backend/src/modules/catalog',
            purpose: t(
              language,
              'Controllers, schemas, logica de service e implementaciones de repository para el dominio de catalogo.',
              'Controllers, schemas, service logic, and repository implementations for the catalog domain.',
            ),
          },
          {
            path: 'backend/src/routes',
            purpose: t(language, 'Registro principal del API y health checks.', 'Top-level API registration and health checks.'),
          },
          {
            path: 'backend/src/middlewares',
            purpose: t(language, 'Validation, errores centralizados y manejo de 404.', 'Validation, centralized errors, and 404 handling.'),
          },
          {
            path: 'backend/src/db',
            purpose: t(
              language,
              'Configuracion del cliente Prisma, memory store y fixtures compartidos para seed.',
              'Prisma client setup, memory store, and shared seed fixtures.',
            ),
          },
          {
            path: 'backend/prisma',
            purpose: t(
              language,
              'El schema de Prisma y el script de seed para PostgreSQL.',
              'The Prisma schema plus seed script for PostgreSQL.',
            ),
          },
        ]}
      />
      <RequestFlow
        language={language}
        title={t(language, 'Por que ayuda separar controller-service-repository', 'Why the split helps')}
        steps={[
          {
            label: 'Controller',
            description: t(
              language,
              'Traduce los objetos request y response de Express a llamadas de aplicacion.',
              'Translates Express request and response objects into application calls.',
            ),
          },
          {
            label: 'Service',
            description: t(
              language,
              'Decide si el request debe usar el repository en memoria del modo API o el repository de DB.',
              'Decides whether the request should use the API-memory repository or the DB repository.',
            ),
          },
          {
            label: 'Repository',
            description: t(
              language,
              'Encapsula el acceso a datos para que el codigo HTTP no sepa como funciona el almacenamiento.',
              'Encapsulates data access so HTTP code never knows how storage works internally.',
            ),
          },
          {
            label: t(language, 'Base de datos', 'Database'),
            description: t(
              language,
              'En modo DB, Prisma guarda y consulta registros de PostgreSQL usando el mismo contrato de producto.',
              'In DB mode, Prisma persists and fetches PostgreSQL records using the same product contract.',
            ),
          },
        ]}
      />
    </div>
  );
}
