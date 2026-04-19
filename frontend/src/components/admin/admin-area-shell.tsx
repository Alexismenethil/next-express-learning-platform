'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Boxes, Database, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';

import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { FakeAuthGuard } from '@/components/admin/fake-auth-guard';
import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

export function AdminAreaShell({
  language,
  children,
}: {
  language: Language;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEntryRoute = pathname === '/admin';

  if (isEntryRoute) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(47,110,131,0.24),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(236,216,180,0.22),transparent_24%),linear-gradient(180deg,#0b151b_0%,#10212a_46%,#10212a_100%)] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40" />
        <div className="relative mx-auto grid min-h-screen max-w-[1480px] gap-10 px-6 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,0.85fr)] lg:items-center lg:px-8">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant="muted" className="border-white/10 bg-white/10 text-white/84">
                Product Catalog Admin
              </Badge>
              <Badge variant="muted" className="border-white/10 bg-white/10 text-white/84">
                {t(language, 'Acceso de demostracion', 'Demo access')}
              </Badge>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-500">
                {t(language, 'Portal interno', 'Internal portal')}
              </p>
              <h1 className="max-w-3xl text-balance text-[clamp(2.9rem,4.6vw,4.9rem)] font-semibold leading-[0.94] tracking-tight">
                {t(
                  language,
                  'Accede al workspace interno del catalogo.',
                  'Access the catalog internal workspace.',
                )}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/68">
                {t(
                  language,
                  'Esta zona ya no se siente como la home. Entras por acceso demo y luego trabajas dentro de un dashboard con sidebar, CRUD, data modes y carga de imagenes.',
                  'This area no longer feels like the home page. You enter through demo access and then work inside a dashboard with a sidebar, CRUD, data modes, and image uploads.',
                )}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_40px_rgba(6,15,20,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/48">
                  {t(language, 'Lo que puedes hacer', 'What you can do')}
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    {
                      icon: Boxes,
                      text: t(language, 'Gestionar productos y categorias del catalogo.', 'Manage catalog products and categories.'),
                    },
                    {
                      icon: Database,
                      text: t(language, 'Alternar entre API mode y DB mode.', 'Switch between API mode and DB mode.'),
                    },
                    {
                      icon: UploadCloud,
                      text: t(language, 'Subir imagenes locales desde el admin.', 'Upload local images from the admin.'),
                    },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                        <item.icon className="size-4.5" />
                      </div>
                      <p className="text-sm leading-6 text-white/72">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_40px_rgba(6,15,20,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/48">
                  {t(language, 'Modo de acceso', 'Access mode')}
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <ShieldCheck className="size-4.5" />
                    </div>
                    <p className="text-sm leading-6 text-white/72">
                      {t(
                        language,
                        'La entrada es visual y didactica: puedes avanzar sin credenciales reales.',
                        'The entry is visual and educational: you can continue without real credentials.',
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <Sparkles className="size-4.5" />
                    </div>
                    <p className="text-sm leading-6 text-white/72">
                      {t(
                        language,
                        'Una vez dentro, el admin usa un shell separado del sitio publico.',
                        'Once inside, the admin uses a shell separated from the public site.',
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(191,228,239,0.12),transparent_26%),linear-gradient(180deg,#091117_0%,#0f1d25_16%,#f5f1e8_16%,#f7f3ea_100%)]">
      <div className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(8,17,23,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div className="space-y-1">
            <p className="text-lg font-semibold tracking-tight text-white">Product Catalog Admin</p>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/54">
              {t(language, 'Workspace interno de demostracion', 'Internal demo workspace')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="muted" className="border-white/10 bg-white/10 text-white/84">
              /admin
            </Badge>
            <Link href="/products" className={buttonClassName('secondary', 'px-4')}>
              {t(language, 'Volver al catalogo', 'Back to catalog')}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-6 lg:px-8">
        <FakeAuthGuard language={language}>
          <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <AdminSidebar language={language} />

            <div className="min-w-0 space-y-6">
              <Card className="overflow-hidden !border-white/80 !bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(247,243,234,0.84)_100%)]">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="muted">{t(language, 'Panel interno', 'Internal panel')}</Badge>
                      <Badge variant="teal">{t(language, 'CRUD + data modes', 'CRUD + data modes')}</Badge>
                    </div>
                    <div>
                      <h1 className="text-3xl font-semibold tracking-tight text-ink-950">
                        {t(language, 'Admin dashboard con acceso separado.', 'Admin dashboard with separate access.')}
                      </h1>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-700">
                        {t(
                          language,
                          'Ya estas dentro de un shell distinto al sitio publico. Desde aqui puedes abrir el dashboard, entrar al CRUD de productos y operar la data en memoria o en PostgreSQL.',
                          'You are now inside a shell distinct from the public site. From here you can open the dashboard, enter product CRUD, and operate data in memory or in PostgreSQL.',
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link href="/admin/dashboard" className={buttonClassName('secondary', 'px-4')}>
                      {t(language, 'Dashboard', 'Dashboard')}
                    </Link>
                    <Link href="/admin/products?mode=api" className={buttonClassName('primary', 'px-4')}>
                      {t(language, 'Abrir CRUD', 'Open CRUD')}
                      <ArrowUpRight className="ml-2 size-4" />
                    </Link>
                  </div>
                </div>
              </Card>

              {children}
            </div>
          </div>
        </FakeAuthGuard>
      </div>
    </div>
  );
}
