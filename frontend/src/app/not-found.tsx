import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function NotFound() {
  const language = await getCurrentLanguage();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral-500">
          {t(language, 'No encontrado', 'Not found')}
        </p>
        <h1 className="text-4xl font-semibold text-ink-950">
          {t(
            language,
            'Esta ruta no existe dentro de la app educativa.',
            'This route does not exist in the teaching app.',
          )}
        </h1>
        <p className="text-sm leading-6 text-ink-700">
          {t(
            language,
            'Esta pantalla sirve para explicar como App Router puede compartir el manejo de not-found cuando un slug o segmento no coincide.',
            'This screen helps explain how App Router can provide shared not-found handling when a product slug or segment does not match.',
          )}
        </p>
        <Link href="/" className="text-sm font-semibold text-teal-600">
          {t(language, 'Volver al inicio', 'Return home')}
        </Link>
      </Card>
    </div>
  );
}
