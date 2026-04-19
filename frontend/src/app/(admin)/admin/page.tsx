import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function AdminDashboardPage() {
  const language = await getCurrentLanguage();
  const adminCards = [
    {
      title: t(language, 'CRUD de productos', 'CRUD products'),
      description: t(
        language,
        'Crea, edita y elimina productos a traves del API de Express.',
        'Create, edit, and delete products through the Express API.',
      ),
      href: '/admin/products?mode=api',
    },
    {
      title: t(language, 'Comparar repositories', 'Compare repositories'),
      description: t(
        language,
        'Cambia de API mode a DB mode y observa como cambia la persistencia sin cambiar la forma de la ruta.',
        'Switch from API mode to DB mode and see how persistence changes without changing the route shape.',
      ),
      href: '/architecture/mock-vs-api-vs-db',
    },
    {
      title: t(language, 'Controles de acceso demo', 'Demo access controls'),
      description: t(
        language,
        'Revisa como el interruptor de fake auth simula un limite de admin con fines didacticos.',
        'Review how the fake auth toggle simulates an admin boundary for teaching purposes.',
      ),
      href: '/demo-access',
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {adminCards.map((card) => (
        <Link key={card.title} href={card.href}>
          <Card className="flex h-full flex-col gap-4 transition hover:-translate-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
              {t(language, 'Panel admin', 'Admin panel')}
            </p>
            <h2 className="text-2xl font-semibold text-ink-950">{card.title}</h2>
            <p className="text-sm leading-6 text-ink-700">{card.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
