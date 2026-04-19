import Link from 'next/link';
import { ArrowUpRight, Database, Layers3, ShieldCheck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function AdminDashboardPage() {
  const language = await getCurrentLanguage();
  const workspaceCards = [
    {
      title: t(language, 'Workspace de catalogo', 'Catalog workspace'),
      description: t(
        language,
        'Gestiona productos con una vista mas cercana a un panel real: tabla, modos de datos, formularios e imagenes.',
        'Manage products with a view closer to a real admin panel: table, data modes, forms, and images.',
      ),
      href: '/admin/products?mode=api',
      icon: Layers3,
    },
    {
      title: t(language, 'Persistencia visible', 'Visible persistence'),
      description: t(
        language,
        'Cambia entre API y DB sin perder la misma UI para ensenar como escala la arquitectura.',
        'Switch between API and DB without losing the same UI to teach how the architecture scales.',
      ),
      href: '/admin/products?mode=db',
      icon: Database,
    },
    {
      title: t(language, 'Boundary de acceso', 'Access boundary'),
      description: t(
        language,
        'La autenticacion es solo visual, pero la entrada al panel ahora se parece mas a un acceso de consola interna.',
        'Authentication is visual only, but entering the panel now feels closer to an internal console access flow.',
      ),
      href: '/admin',
      icon: ShieldCheck,
    },
  ];

  const statCards = [
    {
      label: t(language, 'Zona visible', 'Visible area'),
      value: t(language, 'Shell separado', 'Separate shell'),
    },
    {
      label: t(language, 'Write paths', 'Write paths'),
      value: 'API / DB',
    },
    {
      label: t(language, 'Acceso', 'Access'),
      value: t(language, 'Demo login', 'Demo login'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((card) => (
          <Card key={card.label} className="border-white/80 bg-white/88">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">{card.label}</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-ink-950">{card.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="grid gap-6 md:grid-cols-3">
          {workspaceCards.map((card) => (
            <Link key={card.title} href={card.href}>
              <Card className="flex h-full flex-col gap-4 transition hover:-translate-y-1 hover:shadow-[0_26px_52px_rgba(16,33,42,0.08)]">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-sand-50 text-ink-950">
                  <card.icon className="size-5" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
                    {t(language, 'Admin module', 'Admin module')}
                  </p>
                  <h2 className="text-2xl font-semibold text-ink-950">{card.title}</h2>
                </div>
                <p className="text-sm leading-6 text-ink-700">{card.description}</p>
                <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-ink-950">
                  {t(language, 'Abrir modulo', 'Open module')}
                  <ArrowUpRight className="size-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="space-y-5 !border-white/8 !bg-[linear-gradient(180deg,rgba(16,33,42,0.96)_0%,rgba(24,48,61,0.96)_100%)] !text-sand-50 !shadow-[0_24px_56px_rgba(9,21,28,0.18)]">
          <Badge variant="muted" className="border-white/8 bg-white/10 text-white/84">
            {t(language, 'Recorrido recomendado', 'Recommended walkthrough')}
          </Badge>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t(language, 'Primero opera el catalogo; despues compara la persistencia.', 'Operate the catalog first; then compare persistence.')}
            </h2>
            <p className="text-sm leading-6 text-white/72">
              {t(
                language,
                'Esta vista sirve como hub interno. Desde aqui puedes entrar al CRUD, alternar entre API y DB y volver a la pantalla de acceso demo cuando quieras reiniciar la sesion.',
                'This view acts as an internal hub. From here you can enter the CRUD, alternate between API and DB, and return to the demo access screen whenever you want to restart the session.',
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/admin/products?mode=api">{t(language, 'Abrir API mode', 'Open API mode')}</ButtonLink>
            <ButtonLink href="/admin/products?mode=db" variant="secondary">
              {t(language, 'Abrir DB mode', 'Open DB mode')}
            </ButtonLink>
          </div>
        </Card>
      </div>
    </div>
  );
}
