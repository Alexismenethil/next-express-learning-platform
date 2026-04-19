import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

export function SiteFooter({ language }: { language: Language }) {
  return (
    <footer className="border-t border-white/70 bg-[rgba(255,250,242,0.72)]">
      <div className="mx-auto grid max-w-[1500px] gap-6 px-6 py-10 text-sm text-ink-700 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="space-y-3">
          <p className="font-semibold text-ink-950">Product Catalog Learning Platform</p>
          <p>
            {t(
              language,
              'Disenado como un repositorio real de aprendizaje para onboarding en frontend, backend, flujo de datos, Docker y documentacion.',
              'Built as a real teaching repository for onboarding across frontend, backend, data flow, Docker, and documentation.',
            )}
          </p>
        </div>
        <div className="space-y-2 lg:justify-self-end lg:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-700">
            {t(language, 'Enfoque del proyecto', 'Project focus')}
          </p>
          <p>
            {t(
              language,
              'Arquitectura clara, UI didactica y una experiencia lista para presentar en sesiones de onboarding.',
              'Clear architecture, teaching-first UI, and a presentation-ready onboarding experience.',
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
