import Link from 'next/link';

import { FakeAuthGuard } from '@/components/admin/fake-auth-guard';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const language = await getCurrentLanguage();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-14 lg:px-8">
      <Card className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral-500">
            {t(language, 'Demo admin', 'Admin demo')}
          </p>
          <h1 className="text-3xl font-semibold text-ink-950">
            {t(language, 'Grupo de rutas con proteccion simulada', 'Fake protected route group')}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-ink-700">
            {t(
              language,
              'La URL `/admin` se renderiza a traves del route group de App Router en `src/app/(admin)/admin`. Esto permite ensenar limites de layout sin cambiar la ruta visible.',
              'The `/admin` URL is rendered through the App Router route group at `src/app/(admin)/admin`. This lets the project teach layout boundaries without changing the URL path.',
            )}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin" className={buttonClassName('secondary', 'px-4')}>
            {t(language, 'Panel', 'Dashboard')}
          </Link>
          <Link
            href="/admin/products?mode=api"
            className={buttonClassName('primary', 'px-4')}
          >
            {t(language, 'CRUD de productos', 'Products CRUD')}
          </Link>
        </div>
      </Card>
      <FakeAuthGuard language={language}>{children}</FakeAuthGuard>
    </div>
  );
}
