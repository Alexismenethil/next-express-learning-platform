'use client';

import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { useDemoAuth } from '@/hooks/use-demo-auth';
import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

export function FakeLoginPanel({ language }: { language: Language }) {
  const router = useRouter();
  const { isDemoAuthenticated, setDemoAuthenticated } = useDemoAuth();

  return (
    <Card className="space-y-5">
      <Badge variant="coral">{t(language, 'Solo didactico', 'Teaching only')}</Badge>
      <h1 className="text-3xl font-semibold text-ink-950">
        {t(language, 'Interruptor de acceso demo', 'Demo access toggle')}
      </h1>
      <p className="max-w-2xl text-sm leading-6 text-ink-700">
        {t(
          language,
          'La autenticacion real viviria detras de un provider, cookies seguras y autorizacion en el backend. Esta pagina solo guarda un boolean en local storage para mostrar donde aparecerian los limites del admin dentro de la UI.',
          'Real authentication would live behind a provider, secure cookies, and backend authorization. This page only stores a boolean in local storage so developers can see where admin route boundaries would appear in the UI.',
        )}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setDemoAuthenticated(true);
            router.push('/admin');
          }}
          className={buttonClassName('primary')}
        >
          {t(language, 'Activar demo admin', 'Enable admin demo')}
        </button>
        <button
          type="button"
          onClick={() => setDemoAuthenticated(false)}
          className={buttonClassName('secondary')}
        >
          {t(language, 'Desactivar acceso demo', 'Disable demo access')}
        </button>
      </div>
      <p className="text-sm text-ink-700">
        {t(language, 'Estado actual:', 'Current state:')}{' '}
        <span className="font-semibold text-ink-950">
          {isDemoAuthenticated
            ? t(language, 'Acceso demo activado', 'Demo access enabled')
            : t(language, 'Acceso demo desactivado', 'Demo access disabled')}
        </span>
      </p>
    </Card>
  );
}
