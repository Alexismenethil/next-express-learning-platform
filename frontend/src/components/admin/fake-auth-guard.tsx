'use client';

import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { useDemoAuth } from '@/hooks/use-demo-auth';
import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

export function FakeAuthGuard({
  children,
  language,
}: {
  children: React.ReactNode;
  language: Language;
}) {
  const { isDemoAuthenticated } = useDemoAuth();

  if (!isDemoAuthenticated) {
    return (
      <Card className="border-coral-500/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,243,238,0.88)_100%)] shadow-[0_18px_46px_rgba(16,33,42,0.06)]">
        <div className="space-y-5">
          <div className="flex items-center gap-3 text-coral-500">
            <ShieldAlert className="size-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">
              {t(language, 'Layout protegido simulado', 'Fake protected layout')}
            </p>
          </div>
          <h2 className="text-2xl font-semibold text-ink-950">
            {t(
              language,
              'Las rutas de admin estan limitadas a proposito dentro de la UI.',
              'Admin routes are intentionally gated in the UI.',
            )}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-ink-700">
            {t(
              language,
              'Esto no es autenticacion real. Existe para ensenar limites de rutas, navegacion interna y la diferencia entre una UI protegida y un backend seguro. El admin ahora vive como un workspace separado del sitio publico.',
              'This is not real authentication. It exists to teach route boundaries, internal navigation, and the difference between a gated UI and a secure backend. The admin now lives as a workspace separate from the public site.',
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin" className={buttonClassName('primary')}>
              {t(language, 'Ir a la pantalla de acceso', 'Go to the access screen')}
            </Link>
            <div className="inline-flex items-center rounded-full border border-coral-500/15 bg-white/70 px-4 py-3 text-sm text-ink-700">
              <span className="font-semibold text-ink-950">/admin</span>
              <span className="ml-2">
                {t(language, 'es la entrada del panel.', 'is the panel entry route.')}
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return <>{children}</>;
}
