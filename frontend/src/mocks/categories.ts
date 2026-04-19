import type { Category } from '@/types/catalog';

export const mockCategories: Category[] = [
  {
    id: 'mock-category-workspace',
    slug: 'workspace',
    name: 'Workspace',
    description: 'Frontend mock category that mirrors the backend catalog domain.',
    imageUrl: '/images/products/ergonomic-stand.png',
  },
  {
    id: 'mock-category-audio',
    slug: 'audio',
    name: 'Audio',
    description: 'Helps explain category filtering before the API is ready.',
    imageUrl: '/images/products/noise-lite.png',
  },
  {
    id: 'mock-category-travel',
    slug: 'travel',
    name: 'Travel',
    description: 'Useful for teaching route params and category pages.',
    imageUrl: '/images/products/field-notes.png',
  },
  {
    id: 'mock-category-learning',
    slug: 'learning-tools',
    name: 'Learning Tools',
    description: 'Makes the admin CRUD examples feel realistic but simple.',
    imageUrl: '/images/products/learning-tools.png',
  },
];
