import { mockCategories } from '@/mocks/categories';
import { mockProducts } from '@/mocks/products';
import { t } from '@/lib/i18n';
import type { CatalogLoadResult, Category, DataMode, Product } from '@/types/catalog';
import type { Language } from '@/lib/i18n';

import { backendFetch } from './backend-client';

function filterMockProducts(products: Product[], category?: string, search?: string) {
  const searchValue = search?.toLowerCase();

  return products.filter((product) => {
    if (category && product.categorySlug !== category) {
      return false;
    }

    if (searchValue) {
      return [product.name, product.shortDescription, product.categoryName]
        .join(' ')
        .toLowerCase()
        .includes(searchValue);
    }

    return true;
  });
}

export function getModeSummary(mode: DataMode, language: Language = 'en') {
  switch (mode) {
    case 'mock':
      return {
        sourceLabel: t(language, 'Fuente mock', 'Mock source'),
        sourceSummary: t(
          language,
          'La interfaz lee arreglos locales de TypeScript desde frontend/src/mocks. Es ideal para prototipar sin depender del backend.',
          'The interface reads local TypeScript arrays from frontend/src/mocks. It is ideal for prototyping without depending on the backend.',
        ),
        uiOrigin: 'frontend/src/mocks/products.ts',
      };
    case 'api':
      return {
        sourceLabel: t(language, 'Fuente API', 'API source'),
        sourceSummary: t(
          language,
          'El frontend llama endpoints de Express y el backend responde desde un repository en memoria. Sirve para ensenar separacion de capas sin exigir PostgreSQL todavia.',
          'The frontend calls Express endpoints and the backend responds from an in-memory repository. It teaches separation of layers without requiring PostgreSQL yet.',
        ),
        uiOrigin: 'backend/src/modules/catalog/memory-catalog.repository.ts',
      };
    case 'db':
      return {
        sourceLabel: t(language, 'Fuente de base de datos', 'Database source'),
        sourceSummary: t(
          language,
          'El frontend llama las mismas rutas de Express, pero el backend cambia a Prisma + PostgreSQL para persistencia real.',
          'The frontend calls the same Express routes, but the backend switches to Prisma + PostgreSQL for real persistence.',
        ),
        uiOrigin: 'backend/prisma/schema.prisma + backend/src/modules/catalog/prisma-catalog.repository.ts',
      };
  }
}

export async function getCategories(mode: DataMode): Promise<Category[]> {
  if (mode === 'mock') {
    return mockCategories;
  }

  return backendFetch<Category[]>(`/categories?mode=${mode}`);
}

export async function getProducts(options: {
  mode: DataMode;
  category?: string;
  search?: string;
}): Promise<Product[]> {
  const { mode, category, search } = options;

  if (mode === 'mock') {
    return filterMockProducts(mockProducts, category, search);
  }

  const params = new URLSearchParams({ mode });

  if (category) {
    params.set('category', category);
  }

  if (search) {
    params.set('search', search);
  }

  return backendFetch<Product[]>(`/products?${params.toString()}`);
}

export async function getProductById(mode: DataMode, idOrSlug: string): Promise<Product | null> {
  if (mode === 'mock') {
    return mockProducts.find((product) => product.id === idOrSlug || product.slug === idOrSlug) ?? null;
  }

  try {
    return await backendFetch<Product>(`/products/${idOrSlug}?mode=${mode}`);
  } catch (error) {
    if (error instanceof Error && error.message.toLowerCase().includes('not found')) {
      return null;
    }

    throw error;
  }
}

export async function getCatalogLoadResult(options: {
  mode: DataMode;
  category?: string;
  search?: string;
  language?: Language;
}): Promise<CatalogLoadResult> {
  const summary = getModeSummary(options.mode, options.language ?? 'en');

  try {
    const [products, categories] = await Promise.all([
      getProducts(options),
      getCategories(options.mode),
    ]);

    return {
      mode: options.mode,
      products,
      categories,
      ...summary,
    };
  } catch (error) {
    return {
      mode: options.mode,
      products: [],
      categories: options.mode === 'mock' ? mockCategories : [],
      ...summary,
      error:
        error instanceof Error
          ? error.message
          : t(
              options.language ?? 'en',
              'Error de carga desconocido. Verifica la configuracion del backend y PostgreSQL.',
              'Unknown loading error. Verify backend and PostgreSQL setup.',
            ),
    };
  }
}
