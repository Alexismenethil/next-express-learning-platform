import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

export function getPrimaryNavigation(language: Language) {
  return [
    { href: '/', label: t(language, 'Inicio', 'Home') },
    { href: '/products', label: t(language, 'Catalogo', 'Catalog') },
    { href: '/admin', label: t(language, 'Admin Demo', 'Admin Demo') },
    { href: '/architecture', label: t(language, 'Arquitectura', 'Architecture') },
    { href: '/learning/git-and-env', label: t(language, 'Git y Env', 'Git & Env') },
  ];
}

export function getArchitectureNavigation(language: Language) {
  return [
    { href: '/architecture', label: t(language, 'Resumen', 'Overview') },
    { href: '/architecture/frontend', label: 'Frontend' },
    { href: '/architecture/backend', label: 'Backend' },
    { href: '/architecture/data-flow', label: t(language, 'Flujo de datos', 'Data flow') },
    { href: '/architecture/app-router', label: 'App Router' },
    { href: '/architecture/components', label: t(language, 'Componentes', 'Components') },
    {
      href: '/architecture/mock-vs-api-vs-db',
      label: t(language, 'Modos de datos', 'Data modes'),
    },
  ];
}
