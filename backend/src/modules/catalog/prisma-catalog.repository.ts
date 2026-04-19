import { Prisma } from '@prisma/client';

import { prisma } from '../../db/prisma.js';
import { AppError } from '../../lib/app-error.js';
import { slugify } from '../../utils/slug.js';

import { mapCategory, mapProduct, productWithCategoryArgs } from './catalog.mappers.js';

import type {
  CatalogRepository,
  ProductListQuery,
  ProductMutationInput,
} from './catalog.types.js';

async function getCategoryIdBySlug(categorySlug: string) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!category) {
    throw new AppError('Category not found in PostgreSQL.', 404);
  }

  return category.id;
}

export class PrismaCatalogRepository implements CatalogRepository {
  async getCategories() {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return categories.map(mapCategory);
  }

  async getProducts(query?: ProductListQuery) {
    const where: Prisma.ProductWhereInput = {
      ...(query?.category
        ? {
            category: {
              slug: query.category,
            },
          }
        : {}),
      ...(query?.search
        ? {
            OR: [
              {
                name: {
                  contains: query.search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
              {
                shortDescription: {
                  contains: query.search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ],
          }
        : {}),
    };

    const products = await prisma.product.findMany({
      ...productWithCategoryArgs,
      where,
      orderBy: {
        name: 'asc',
      },
    });

    return products.map(mapProduct);
  }

  async getProductById(idOrSlug: string) {
    const product = await prisma.product.findFirst({
      ...productWithCategoryArgs,
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });

    return product ? mapProduct(product) : null;
  }

  async createProduct(input: ProductMutationInput) {
    const categoryId = await getCategoryIdBySlug(input.categorySlug);

    const product = await prisma.product.create({
      ...productWithCategoryArgs,
      data: {
        id: `product-${slugify(input.name)}`,
        slug: slugify(input.name),
        name: input.name,
        shortDescription: input.shortDescription,
        description: input.description,
        price: input.price,
        inventory: input.inventory,
        status: input.status,
        featured: input.featured,
        learningNotes: input.learningNotes,
        categoryId,
      },
    });

    return mapProduct(product);
  }

  async updateProduct(id: string, input: ProductMutationInput) {
    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError('Product not found in PostgreSQL.', 404);
    }

    const categoryId = await getCategoryIdBySlug(input.categorySlug);

    const product = await prisma.product.update({
      ...productWithCategoryArgs,
      where: { id },
      data: {
        slug: slugify(input.name),
        name: input.name,
        shortDescription: input.shortDescription,
        description: input.description,
        price: input.price,
        inventory: input.inventory,
        status: input.status,
        featured: input.featured,
        learningNotes: input.learningNotes,
        categoryId,
      },
    });

    return mapProduct(product);
  }

  async deleteProduct(id: string) {
    await prisma.product.delete({
      where: { id },
    });
  }
}
