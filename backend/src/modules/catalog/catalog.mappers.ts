import type { CategoryDto, ProductDto } from './catalog.types.js';

type PrismaCategoryRecord = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

type PrismaProductWithCategory = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: { toString(): string } | number;
  inventory: number;
  status: string;
  featured: boolean;
  categoryId: string;
  learningNotes: unknown;
  createdAt: Date;
  updatedAt: Date;
  category: PrismaCategoryRecord;
};

export function mapCategory(category: PrismaCategoryRecord | CategoryDto): CategoryDto {
  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    description: category.description,
  };
}

export function mapProduct(product: PrismaProductWithCategory): ProductDto {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    price: Number(product.price),
    inventory: product.inventory,
    status: product.status,
    featured: product.featured,
    categoryId: product.categoryId,
    categorySlug: product.category.slug,
    categoryName: product.category.name,
    learningNotes: Array.isArray(product.learningNotes)
      ? product.learningNotes.map((item: unknown) => String(item))
      : [],
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}
