'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { Compass, DatabaseZap, Layers3, Route, Sparkles, ToyBrick } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n';
import type { DataMode } from '@/types/catalog';

type Mission = {
  id: 'catalog' | 'data' | 'architecture';
  icon: typeof Compass;
  title: string;
  subtitle: string;
  summary: string;
  lessonTitle: string;
  lessons: string[];
  files: string[];
  href: string;
  cta: string;
};

const modeOrder: DataMode[] = ['mock', 'api', 'db'];

export function InteractiveLearningPanel({
  language,
  mode,
}: {
  language: Language;
  mode: DataMode;
}) {
  const reduceMotion = useReducedMotion();
  const [activeMissionId, setActiveMissionId] = useState<Mission['id']>('catalog');
  const [previewMode, setPreviewMode] = useState<DataMode>(mode);

  const missions = useMemo<Mission[]>(
    () => [
      {
        id: 'catalog',
        icon: Compass,
        title: t(language, 'Mision 1: entender el producto', 'Mission 1: understand the product'),
        subtitle: t(language, 'Empieza por la experiencia visible', 'Start with the visible experience'),
        summary: t(
          language,
          'Abre el catalogo y descubre primero que problema resuelve la app antes de entrar a carpetas o arquitectura.',
          'Open the catalog and understand what problem the app solves before diving into folders or architecture.',
        ),
        lessonTitle: t(language, 'Que aprendes aqui', 'What you learn here'),
        lessons: [
          t(language, 'Que rutas publicas existen y por que.', 'Which public routes exist and why.'),
          t(language, 'Como se comporta una card de producto reutilizable.', 'How a reusable product card behaves.'),
          t(language, 'Como una UI limpia puede enseñar sin distraer.', 'How a clean UI can teach without distracting.'),
        ],
        files: ['frontend/src/app/products/page.tsx', 'frontend/src/components/catalog/product-card.tsx'],
        href: `/products?mode=${previewMode}`,
        cta: t(language, 'Abrir catalogo', 'Open catalog'),
      },
      {
        id: 'data',
        icon: DatabaseZap,
        title: t(language, 'Mision 2: tocar el flujo de datos', 'Mission 2: touch the data flow'),
        subtitle: t(language, 'Prueba Mock, API y DB como un laboratorio', 'Try Mock, API, and DB like a lab'),
        summary: t(
          language,
          'Cambia el origen de datos y mira como la misma interfaz se mantiene estable aunque la fuente cambie.',
          'Switch the data source and see how the same interface stays stable while the source changes.',
        ),
        lessonTitle: t(language, 'Que cambia al interactuar', 'What changes when you interact'),
        lessons: [
          t(language, 'Mock acelera prototipos y reduce dependencias.', 'Mock speeds up prototypes and reduces dependencies.'),
          t(language, 'API separa frontend y backend con contratos claros.', 'API separates frontend and backend with clear contracts.'),
          t(language, 'DB añade persistencia real sin rehacer la UI.', 'DB adds real persistence without rebuilding the UI.'),
        ],
        files: ['frontend/src/services/catalog-service.ts', 'backend/src/modules/catalog/prisma-catalog.repository.ts'],
        href: '/architecture/mock-vs-api-vs-db',
        cta: t(language, 'Abrir laboratorio de datos', 'Open data lab'),
      },
      {
        id: 'architecture',
        icon: Route,
        title: t(language, 'Mision 3: mapear la arquitectura', 'Mission 3: map the architecture'),
        subtitle: t(language, 'Conecta pantallas, componentes y backend', 'Connect screens, components, and backend'),
        summary: t(
          language,
          'Explora la guia de arquitectura como un mapa visual para relacionar cada capa del stack con el producto real.',
          'Explore the architecture guide as a visual map that connects each layer of the stack to the real product.',
        ),
        lessonTitle: t(language, 'Preguntas que esta mision responde', 'Questions this mission answers'),
        lessons: [
          t(language, 'Que vive en app/ y que vive fuera.', 'What belongs in app/ and what belongs outside it.'),
          t(language, 'Como App Router organiza layouts y segmentos dinamicos.', 'How App Router organizes layouts and dynamic segments.'),
          t(language, 'Donde empieza Express y donde termina Next.js.', 'Where Express starts and where Next.js stops.'),
        ],
        files: ['frontend/src/app/architecture/page.tsx', 'backend/src/app.ts'],
        href: '/architecture',
        cta: t(language, 'Abrir mapa de arquitectura', 'Open architecture map'),
      },
    ],
    [language, previewMode],
  );

  const activeMission = missions.find((mission) => mission.id === activeMissionId) ?? missions[0];

  const modeDetails = {
    mock: {
      icon: ToyBrick,
      label: 'Mock',
      description: t(
        language,
        'Ideal para empezar rapido y enseñar componentes sin depender del backend.',
        'Best for starting fast and teaching components without depending on the backend.',
      ),
      detail: 'frontend/src/mocks/products.ts',
    },
    api: {
      icon: Layers3,
      label: 'API',
      description: t(
        language,
        'Perfecto para explicar contratos, rutas y validacion entre frontend y backend.',
        'Perfect for explaining contracts, routes, and validation between frontend and backend.',
      ),
      detail: 'GET /api/products?mode=api',
    },
    db: {
      icon: DatabaseZap,
      label: 'DB',
      description: t(
        language,
        'Muestra persistencia real y como Prisma aísla el acceso a PostgreSQL.',
        'Shows real persistence and how Prisma isolates access to PostgreSQL.',
      ),
      detail: 'Prisma -> PostgreSQL',
    },
  } satisfies Record<DataMode, { icon: typeof ToyBrick; label: string; description: string; detail: string }>;

  const modePreview = modeDetails[previewMode];
  const ModeIcon = modePreview.icon;

  return (
    <Card className="relative overflow-hidden border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(247,243,234,0.94)_44%,rgba(191,228,239,0.16)_100%)] p-0 shadow-[0_24px_90px_rgba(16,33,42,0.08)]">
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(30,139,131,0.16),transparent_72%)]" />
      <div className="relative grid gap-0 2xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="min-w-0 border-b border-white/70 p-5 2xl:border-b-0 2xl:border-r">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600">
                {t(language, 'Laboratorio interactivo', 'Interactive learning lab')}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-950">
                {t(language, 'Elige una mision', 'Choose a mission')}
              </h2>
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] text-sand-50 shadow-[0_16px_32px_rgba(16,33,42,0.14)]">
              <Sparkles className="size-5" />
            </div>
          </div>

          <LayoutGroup>
            <div className="grid gap-3 md:grid-cols-3 2xl:grid-cols-1">
              {missions.map((mission) => {
                const Icon = mission.icon;
                const isActive = mission.id === activeMission.id;

                return (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => setActiveMissionId(mission.id)}
                    className={cn(
                      'relative flex w-full items-start gap-4 rounded-[26px] border px-4 py-4 text-left transition',
                      isActive
                        ? 'border-white/80 bg-white/92 shadow-[0_18px_40px_rgba(16,33,42,0.08)]'
                        : 'border-transparent bg-white/52 hover:border-white/75 hover:bg-white/78',
                    )}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="mission-highlight"
                        className="absolute inset-0 rounded-[26px] border border-white/80 bg-white/92"
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                      />
                    ) : null}
                    <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sand-50 text-ink-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                      <Icon className="size-5" />
                    </div>
                    <div className="relative z-10 min-w-0 space-y-1">
                      <p className="text-sm font-semibold text-ink-950">{mission.title}</p>
                      <p className="text-sm leading-6 text-ink-700">{mission.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <div className="min-w-0 p-5 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMission.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="teal">{activeMission.title}</Badge>
                <Badge variant="default">{t(language, 'Interactivo', 'Interactive')}</Badge>
              </div>

              <div className="space-y-3">
                <h3 className="max-w-3xl text-[clamp(2rem,2.6vw,3.2rem)] font-semibold leading-[1.02] tracking-tight text-ink-950">
                  {activeMission.summary}
                </h3>
                <p className="max-w-2xl text-base leading-7 text-ink-700">
                  {t(
                    language,
                    'Haz clic en cada mision para cambiar el foco. La idea es aprender tocando la interfaz, no solo leyendo bloques.',
                    'Click each mission to change the focus. The goal is to learn by touching the interface, not just reading blocks.',
                  )}
                </p>
              </div>

              {activeMission.id === 'data' ? (
                <div className="rounded-[28px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(247,243,234,0.88)_100%)] p-5 shadow-[0_14px_36px_rgba(16,33,42,0.06)]">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700">
                        {t(language, 'Mini simulador de datos', 'Mini data simulator')}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ink-700">
                        {t(
                          language,
                          'Toca un modo y observa como cambia la explicacion del origen de datos.',
                          'Tap a mode and see how the explanation of the data source changes.',
                        )}
                      </p>
                    </div>
                    <div className="inline-flex rounded-full border border-ink-900/8 bg-white/88 p-1">
                      {modeOrder.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setPreviewMode(option)}
                          className={cn(
                            'rounded-full px-4 py-2 text-sm font-semibold transition',
                            option === previewMode
                              ? 'bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] text-sand-50 shadow-[0_12px_28px_rgba(16,33,42,0.18)]'
                              : 'text-ink-700 hover:bg-sand-50 hover:text-ink-950',
                          )}
                        >
                          {option.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    key={previewMode}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                    animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="mt-5 grid gap-4 2xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]"
                  >
                    <div className="min-w-0 rounded-[24px] border border-white/80 bg-white/82 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-sand-50 text-ink-950">
                          <ModeIcon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink-950">{modePreview.label}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-teal-600">
                            {t(language, 'Modo activo', 'Active mode')}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-ink-700">{modePreview.description}</p>
                      <code className="mt-4 block break-all rounded-2xl bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] px-4 py-3 font-mono text-sm text-sand-50">
                        {modePreview.detail}
                      </code>
                    </div>

                    <div className="min-w-0 grid gap-3 md:grid-cols-3">
                      {[
                        {
                          title: t(language, 'UI', 'UI'),
                          description: t(language, 'La pantalla se mantiene estable.', 'The screen stays stable.'),
                        },
                        {
                          title: t(language, 'Servicio', 'Service'),
                          description: t(language, 'Decide de donde vienen los datos.', 'Decides where the data comes from.'),
                        },
                        {
                          title: t(language, 'Origen', 'Source'),
                          description: modePreview.description,
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={`${previewMode}-${item.title}`}
                          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          transition={{ delay: reduceMotion ? 0 : index * 0.05, duration: 0.2 }}
                          className="rounded-[22px] border border-white/80 bg-white/80 p-4"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-ink-700">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
                  <div className="min-w-0 rounded-[28px] border border-white/80 bg-white/82 p-5 shadow-[0_14px_36px_rgba(16,33,42,0.06)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
                      {activeMission.lessonTitle}
                    </p>
                    <div className="mt-4 space-y-3">
                      {activeMission.lessons.map((lesson, index) => (
                        <motion.div
                          key={lesson}
                          initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                          transition={{ delay: reduceMotion ? 0 : index * 0.06, duration: 0.2 }}
                          className="flex items-start gap-3 rounded-[22px] border border-white/80 bg-sand-50/70 px-4 py-3"
                        >
                          <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-ink-950 text-xs font-semibold text-sand-50">
                            {index + 1}
                          </div>
                          <p className="text-sm leading-6 text-ink-700">{lesson}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-0 rounded-[28px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(247,243,234,0.88)_100%)] p-5 shadow-[0_14px_36px_rgba(16,33,42,0.06)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700">
                      {t(language, 'Archivos que veras', 'Files you will visit')}
                    </p>
                    <div className="mt-4 space-y-3">
                      {activeMission.files.map((file, index) => (
                        <motion.code
                          key={file}
                          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                          transition={{ delay: reduceMotion ? 0 : index * 0.05, duration: 0.2 }}
                          className="block break-all rounded-[20px] bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] px-4 py-3 font-mono text-sm text-sand-50 shadow-[0_14px_30px_rgba(16,33,42,0.12)]"
                        >
                          {file}
                        </motion.code>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-ink-700">
                  {t(
                    language,
                    'Consejo: cambia de mision varias veces y compara que se mantiene fijo.',
                    'Tip: switch missions a few times and compare what stays stable.',
                  )}
                </p>
                <Link href={activeMission.href} className={buttonClassName('primary')}>
                  {activeMission.cta}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
