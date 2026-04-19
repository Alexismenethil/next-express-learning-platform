import { FolderTree } from '@/components/education/folder-tree';
import { SectionHeading } from '@/components/ui/section-heading';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function GitAndEnvPage() {
  const language = await getCurrentLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow={t(language, 'Git y entorno', 'Git and environment')}
        title={t(
          language,
          'Por que importan `.env.example` y `.gitignore`.',
          'Why `.env.example` and `.gitignore` matter.',
        )}
        description={t(
          language,
          'Las personas nuevas deben entender no solo como correr el proyecto, sino tambien que nunca debe hacerse commit y como el equipo protege la configuracion.',
          'New developers should understand not only how to run the project, but also what must never be committed and how teams keep configuration safe.',
        )}
      />
      <FolderTree
        title={t(language, 'Archivos para explicar en onboarding', 'Files to explain during onboarding')}
        items={[
          {
            path: 'frontend/.env.example and backend/.env.example',
            purpose: t(
              language,
              'Plantillas versionadas que muestran que variables existen y que controla cada una.',
              'Committed templates that show which variables exist and what each one controls.',
            ),
          },
          {
            path: '.gitignore',
            purpose: t(
              language,
              'Evita que secretos locales, dependencias, logs y build output ensucien el repositorio.',
              'Prevents local secrets, dependencies, logs, and build output from polluting the repository.',
            ),
          },
          {
            path: 'docs/ENVIRONMENT-VARIABLES.md',
            purpose: t(
              language,
              'Explicacion larga de por que los secretos se quedan locales y ejemplos de valores seguros por defecto.',
              'Long-form explanation of why secrets stay local and examples of safe defaults.',
            ),
          },
          {
            path: 'docs/GITIGNORE-EXPLAINED.md',
            purpose: t(
              language,
              'Guia explicita y amigable para principiantes sobre archivos ignorados, assets generados e historial limpio de Git.',
              'Explicit beginner-friendly guide to ignored files, generated assets, and clean Git history.',
            ),
          },
        ]}
      />
    </div>
  );
}
