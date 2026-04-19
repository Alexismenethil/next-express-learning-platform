'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Boxes, Database, GitBranch, Layers3, Route, ServerCog } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n';

type ExplorerSection = {
  id: string;
  href: string;
  label: string;
  icon: typeof Layers3;
  headline: string;
  summary: string;
  bullets: string[];
  files: string[];
  question: string;
};

export function ArchitectureExplorer({ language }: { language: Language }) {
  const reduceMotion = useReducedMotion();

  const sections = useMemo<ExplorerSection[]>(
    () => [
      {
        id: 'frontend',
        href: '/architecture/frontend',
        label: 'Frontend',
        icon: Layers3,
        headline: t(language, 'Que parte ve y toca el estudiante primero', 'What the student sees and touches first'),
        summary: t(
          language,
          'Explica por que las rutas viven en app/ y los componentes reutilizables viven fuera, para mantener orden mental desde el inicio.',
          'Explains why routes live in app/ and reusable components live outside it, so the mental model stays clean from the start.',
        ),
        bullets: [
          t(language, 'Pantallas, layouts y loading states.', 'Screens, layouts, and loading states.'),
          t(language, 'Componentes reutilizables y servicios.', 'Reusable components and services.'),
          t(language, 'Bordes entre UI y logica de datos.', 'Boundaries between UI and data logic.'),
        ],
        files: ['src/app/', 'src/components/', 'src/services/'],
        question: t(language, 'Pregunta guia: por que no todo vive dentro de app/?', 'Guiding question: why does not everything live inside app/?'),
      },
      {
        id: 'backend',
        href: '/architecture/backend',
        label: 'Backend',
        icon: ServerCog,
        headline: t(language, 'Donde el proyecto se vuelve una app real', 'Where the project becomes a real app'),
        summary: t(
          language,
          'Muestra como Express separa rutas, validacion, servicios y repositorios para que cada responsabilidad sea visible.',
          'Shows how Express separates routes, validation, services, and repositories so each responsibility is visible.',
        ),
        bullets: [
          t(language, 'Controladores pequeños y servicios claros.', 'Small controllers and clear services.'),
          t(language, 'Validacion centralizada con Zod.', 'Centralized validation with Zod.'),
          t(language, 'Repositorios aislando memoria y Prisma.', 'Repositories isolating memory and Prisma.'),
        ],
        files: ['backend/src/routes/', 'backend/src/modules/', 'backend/src/middlewares/'],
        question: t(language, 'Pregunta guia: donde se decide la persistencia?', 'Guiding question: where is persistence decided?'),
      },
      {
        id: 'data-flow',
        href: '/architecture/data-flow',
        label: t(language, 'Flujo de datos', 'Data flow'),
        icon: GitBranch,
        headline: t(language, 'Sigue el viaje completo de una accion', 'Follow the full journey of an action'),
        summary: t(
          language,
          'Ideal para enseñar como una interacción de UI termina en un servicio, un endpoint y eventualmente una base de datos.',
          'Perfect for teaching how a UI interaction ends up in a service, an endpoint, and eventually a database.',
        ),
        bullets: [
          t(language, 'UI -> service -> API -> repository.', 'UI -> service -> API -> repository.'),
          t(language, 'Mismo flujo, distinto origen de datos.', 'Same flow, different data source.'),
          t(language, 'Qué cambia y qué no cambia.', 'What changes and what does not.'),
        ],
        files: ['frontend/src/services/', 'backend/src/modules/catalog/', 'backend/src/db/'],
        question: t(language, 'Pregunta guia: que parte se mantiene estable?', 'Guiding question: which part stays stable?'),
      },
      {
        id: 'app-router',
        href: '/architecture/app-router',
        label: 'App Router',
        icon: Route,
        headline: t(language, 'Como Next organiza la navegacion moderna', 'How Next organizes modern navigation'),
        summary: t(
          language,
          'Aterriza layouts, route groups, segmentos dinamicos y server components con ejemplos que el estudiante ya vio en la app.',
          'Breaks down layouts, route groups, dynamic segments, and server components using examples the student already saw in the app.',
        ),
        bullets: [
          t(language, 'Layouts compartidos sin repetir codigo.', 'Shared layouts without repeating code.'),
          t(language, 'Segmentos dinamicos como [id].', 'Dynamic segments such as [id].'),
          t(language, 'Grupos de rutas como (admin).', 'Route groups such as (admin).'),
        ],
        files: ['frontend/src/app/layout.tsx', 'frontend/src/app/(admin)/', 'frontend/src/app/products/[id]/'],
        question: t(language, 'Pregunta guia: que hace especial a app/?', 'Guiding question: what makes app/ special?'),
      },
      {
        id: 'components',
        href: '/architecture/components',
        label: t(language, 'Componentes', 'Components'),
        icon: Boxes,
        headline: t(language, 'Como construir piezas que enseñen y escalen', 'How to build pieces that teach and scale'),
        summary: t(
          language,
          'Enseña por que una card, un banner o un toggle deben vivir como piezas reutilizables y no incrustadas en cada pagina.',
          'Teaches why a card, banner, or toggle should live as reusable pieces instead of being buried inside every page.',
        ),
        bullets: [
          t(language, 'UI base y componentes educativos.', 'Base UI and educational components.'),
          t(language, 'Consistencia visual sin duplicar trabajo.', 'Visual consistency without duplicate work.'),
          t(language, 'Más claridad para juniors y para el equipo.', 'More clarity for juniors and for the team.'),
        ],
        files: ['frontend/src/components/ui/', 'frontend/src/components/education/', 'frontend/src/components/catalog/'],
        question: t(language, 'Pregunta guia: que se reutiliza y por que?', 'Guiding question: what gets reused and why?'),
      },
      {
        id: 'data-modes',
        href: '/architecture/mock-vs-api-vs-db',
        label: t(language, 'Modos de datos', 'Data modes'),
        icon: Database,
        headline: t(language, 'La misma UI, tres fuentes distintas', 'The same UI, three different sources'),
        summary: t(
          language,
          'Es el corazón didáctico del proyecto: ayuda a entender prototipado, separación de responsabilidades y persistencia real.',
          'It is the educational heart of the project: it helps explain prototyping, separation of concerns, and real persistence.',
        ),
        bullets: [
          t(language, 'Mock para velocidad.', 'Mock for speed.'),
          t(language, 'API para contratos.', 'API for contracts.'),
          t(language, 'DB para producción.', 'DB for production.'),
        ],
        files: ['frontend/src/mocks/', 'backend/src/modules/catalog/memory-catalog.repository.ts', 'backend/src/modules/catalog/prisma-catalog.repository.ts'],
        question: t(language, 'Pregunta guia: por que la UI no cambia?', 'Guiding question: why does the UI not change?'),
      },
    ],
    [language],
  );

  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? 'frontend');
  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0];
  const Icon = activeSection.icon;

  return (
    <Card className="overflow-hidden border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(247,243,234,0.94)_44%,rgba(191,228,239,0.16)_100%)] p-0 shadow-[0_22px_80px_rgba(16,33,42,0.08)]">
      <div className="grid gap-0 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/70 p-5 xl:border-b-0 xl:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600">
            {t(language, 'Mapa interactivo', 'Interactive map')}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-950">
            {t(language, 'Pulsa una pieza del stack', 'Tap a piece of the stack')}
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink-700">
            {t(
              language,
              'Cada opcion cambia el panel de la derecha para explicarte que aprender, que archivos visitar y que pregunta hacerte.',
              'Each option changes the panel on the right to explain what you will learn, which files to visit, and which question to ask.',
            )}
          </p>

          <LayoutGroup>
            <div className="mt-5 space-y-3">
              {sections.map((section) => {
                const SectionIcon = section.icon;
                const isActive = section.id === activeSection.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSectionId(section.id)}
                    className={cn(
                      'relative flex w-full items-center gap-4 rounded-[24px] border px-4 py-4 text-left transition',
                      isActive
                        ? 'border-white/80 bg-white/92 shadow-[0_18px_38px_rgba(16,33,42,0.08)]'
                        : 'border-transparent bg-white/54 hover:border-white/80 hover:bg-white/78',
                    )}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="architecture-highlight"
                        className="absolute inset-0 rounded-[24px] border border-white/80 bg-white/92"
                        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                      />
                    ) : null}
                    <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sand-50 text-ink-950">
                      <SectionIcon className="size-5" />
                    </div>
                    <div className="relative z-10 min-w-0">
                      <p className="text-sm font-semibold text-ink-950">{section.label}</p>
                      <p className="mt-1 text-sm leading-6 text-ink-700">{section.question}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <div className="p-5 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="teal">{activeSection.label}</Badge>
                <Badge variant="default">{t(language, 'Explorable', 'Explorable')}</Badge>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] text-sand-50 shadow-[0_16px_34px_rgba(16,33,42,0.14)]">
                  <Icon className="size-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-semibold tracking-tight text-ink-950">
                    {activeSection.headline}
                  </h3>
                  <p className="max-w-2xl text-base leading-7 text-ink-700">{activeSection.summary}</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
                <div className="rounded-[28px] border border-white/80 bg-white/84 p-5 shadow-[0_14px_36px_rgba(16,33,42,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
                    {t(language, 'Lo que desbloqueas', 'What you unlock')}
                  </p>
                  <div className="mt-4 space-y-3">
                    {activeSection.bullets.map((bullet, index) => (
                      <motion.div
                        key={bullet}
                        initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                        animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                        transition={{ delay: reduceMotion ? 0 : index * 0.05, duration: 0.2 }}
                        className="flex items-start gap-3 rounded-[20px] border border-white/80 bg-sand-50/70 px-4 py-3"
                      >
                        <div className="mt-1 flex size-7 items-center justify-center rounded-full bg-ink-950 text-xs font-semibold text-sand-50">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-6 text-ink-700">{bullet}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(247,243,234,0.9)_100%)] p-5 shadow-[0_14px_36px_rgba(16,33,42,0.06)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-700">
                    {t(language, 'Archivos clave', 'Key files')}
                  </p>
                  <div className="mt-4 space-y-3">
                    {activeSection.files.map((file, index) => (
                      <motion.code
                        key={file}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ delay: reduceMotion ? 0 : index * 0.04, duration: 0.2 }}
                        className="block rounded-[20px] bg-[linear-gradient(135deg,rgba(16,33,42,0.98)_0%,rgba(24,48,61,0.98)_100%)] px-4 py-3 font-mono text-sm text-sand-50"
                      >
                        {file}
                      </motion.code>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/80 bg-white/84 p-5 shadow-[0_14px_36px_rgba(16,33,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
                  {t(language, 'Pregunta que deberias hacer', 'Question you should ask')}
                </p>
                <p className="mt-3 text-lg font-semibold text-ink-950">{activeSection.question}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-ink-700">
                  {t(
                    language,
                    'Abre la seccion cuando ya tengas claro que quieres descubrir.',
                    'Open the section once you are clear about what you want to discover.',
                  )}
                </p>
                <Link href={activeSection.href} className={buttonClassName('primary')}>
                  {t(language, 'Abrir esta seccion', 'Open this section')}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
