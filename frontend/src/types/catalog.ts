export type DataMode = 'mock' | 'api' | 'db';

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  inventory: number;
  status: 'draft' | 'published';
  featured: boolean;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  learningNotes: string[];
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
};

export type ProductFormValues = {
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  inventory: number;
  status: 'draft' | 'published';
  featured: boolean;
  categorySlug: string;
  learningNotes: string[];
};

export type CatalogLoadResult = {
  mode: DataMode;
  products: Product[];
  categories: Category[];
  sourceLabel: string;
  sourceSummary: string;
  uiOrigin: string;
  error?: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  mode?: 'api' | 'db';
  data: T;
};
