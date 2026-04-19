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
      <Card className="border-coral-500/15 bg-coral-500/5">
        <div className="space-y-4">
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
              'Esto no es autenticacion real. Existe para ensenar limites de rutas, navegacion de admin y la diferencia entre una experiencia protegida y un backend seguro.',
              'This is not real authentication. It exists to teach route boundaries, admin navigation, and the difference between protected experiences and secure backends.',
            )}
          </p>
          <Link
            href="/demo-access"
            className={buttonClassName('primary')}
          >
            {t(language, 'Activar acceso demo de admin', 'Enable demo admin access')}
          </Link>
        </div>
      </Card>
    );
  }

  return <>{children}</>;
}
