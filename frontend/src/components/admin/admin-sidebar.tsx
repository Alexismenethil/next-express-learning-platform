'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Boxes, ChevronRight, LogOut, Sparkles, Workflow } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { useDemoAuth } from '@/hooks/use-demo-auth';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n';

export function AdminSidebar({ language }: { language: Language }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setDemoAuthenticated } = useDemoAuth();
  const mode = searchParams.get('mode') === 'db' ? 'db' : 'api';

  const items = [
    {
      href: '/admin/dashboard',
      match: '/admin/dashboard',
      label: t(language, 'Resumen', 'Overview'),
      description: t(
        language,
        'Vista general del panel y accesos rapidos.',
        'Dashboard overview and quick actions.',
      ),
      icon: Sparkles,
      exact: true,
    },
    {
      href: `/admin/products?mode=${mode}`,
      match: '/admin/products',
      label: t(language, 'Productos', 'Products'),
      description: t(
        language,
        'CRUD, modos API y DB, y validacion.',
        'CRUD, API and DB modes, and validation.',
      ),
      icon: Boxes,
    },
    {
      href: '/architecture/data-flow',
      match: '/architecture/data-flow',
      label: t(language, 'Flujo de datos', 'Data flow'),
      description: t(
        language,
        'Relaciona el panel con Express y PostgreSQL.',
        'Connect the panel to Express and PostgreSQL.',
      ),
      icon: Workflow,
      exact: true,
    },
  ];

  return (
    <aside className="min-w-0 xl:sticky xl:top-28 xl:self-start">
      <Card className="space-y-5 !border-white/10 !bg-[linear-gradient(180deg,rgba(18,32,40,0.97)_0%,rgba(23,45,57,0.97)_100%)] !text-sand-50 !shadow-[0_28px_80px_rgba(9,21,28,0.24)]">
        <div className="space-y-3">
          <Badge variant="muted" className="border-white/10 bg-white/10 text-white/88">
            {t(language, 'Area interna de demo', 'Internal demo area')}
          </Badge>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {t(language, 'Admin workspace', 'Admin workspace')}
            </h2>
            <p className="text-sm leading-6 text-white/72">
              {t(
                language,
                'Este panel ya no aparece en la navegacion publica principal. Se entra por la ruta directa `/admin` y se comporta como una zona interna.',
                'This panel no longer appears in the main public navigation. It is reached through the direct `/admin` route and behaves like an internal area.',
              )}
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const isActive = item.exact ? pathname === item.match : pathname.startsWith(item.match);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-start gap-3 rounded-[24px] border px-4 py-4 transition duration-200',
                  isActive
                    ? 'border-white/14 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
                    : 'border-white/6 bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.06]',
                )}
              >
                <div
                  className={cn(
                    'mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl transition',
                    isActive ? 'bg-white text-ink-950' : 'bg-white/8 text-white/84',
                  )}
                >
                  <item.icon className="size-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <ChevronRight
                      className={cn(
                        'size-4 shrink-0 text-white/35 transition group-hover:text-white/65',
                        isActive && 'text-white/72',
                      )}
                    />
                  </div>
                  <p className="mt-1 text-xs leading-5 text-white/60">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">
              {t(language, 'Entrada', 'Entry')}
            </p>
            <p className="mt-2 text-sm font-semibold text-white">/admin</p>
            <p className="mt-1 text-xs leading-5 text-white/58">
              {t(language, 'Ruta directa, no promocionada en la home.', 'Direct route, not promoted on the home page.')}
            </p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">
              {t(language, 'Persistencia', 'Persistence')}
            </p>
            <p className="mt-2 text-sm font-semibold text-white">{mode.toUpperCase()}</p>
            <p className="mt-1 text-xs leading-5 text-white/58">
              {mode === 'db'
                ? t(language, 'Mutaciones persistidas en PostgreSQL.', 'Mutations persisted in PostgreSQL.')
                : t(language, 'Mutaciones temporales en memoria via Express.', 'Temporary in-memory mutations through Express.')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setDemoAuthenticated(false);
            router.push('/admin');
          }}
          className={buttonClassName('secondary', 'w-full justify-center border-white/10 bg-white/8 text-white hover:border-white/18 hover:bg-white/10 hover:text-white')}
        >
          <LogOut className="mr-2 size-4" />
          {t(language, 'Cerrar sesion demo', 'End demo session')}
        </button>
      </Card>
    </aside>
  );
}
