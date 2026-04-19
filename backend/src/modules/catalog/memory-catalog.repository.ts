import { AppError } from '../../lib/app-error.js';
import { memoryStore } from '../../db/memory-store.js';
import { slugify } from '../../utils/slug.js';

import type {
  CatalogRepository,
  CategoryDto,
  ProductDto,
  ProductListQuery,
  ProductMutationInput,
} from './catalog.types.js';

function toCategoryDto(record: CategoryDto): CategoryDto {
  return { ...record };
}

function toProductDto(record: (typeof memoryStore.products)[number]): ProductDto {
  const category = memoryStore.categories.find((item) => item.id === record.categoryId);

  if (!category) {
    throw new AppError(`Category missing for product ${record.id}`, 500);
  }

  return {
    ...record,
    learningNotes: [...record.learningNotes],
    categorySlug: category.slug,
    categoryName: category.name,
  };
}

export class MemoryCatalogRepository implements CatalogRepository {
  async getCategories() {
    return memoryStore.categories.map(toCategoryDto);
  }

  async getProducts(query?: ProductListQuery) {
    const searchValue = query?.search?.toLowerCase();

    return memoryStore.products
      .map(toProductDto)
      .filter((product) => {
        if (query?.category && product.categorySlug !== query.category) {
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

  async getProductById(idOrSlug: string) {
    const product = memoryStore.products.find(
      (item) => item.id === idOrSlug || item.slug === idOrSlug,
    );

    return product ? toProductDto(product) : null;
  }

  async createProduct(input: ProductMutationInput) {
    const category = memoryStore.categories.find((item) => item.slug === input.categorySlug);

    if (!category) {
      throw new AppError('Category not found in memory repository.', 404);
    }

    const now = new Date().toISOString();
    const record = {
      id: `product-${slugify(input.name)}`,
      slug: slugify(input.name),
      name: input.name,
      shortDescription: input.shortDescription,
      description: input.description,
      price: input.price,
      inventory: input.inventory,
      status: input.status,
      featured: input.featured,
      categoryId: category.id,
      learningNotes: [...input.learningNotes],
      createdAt: now,
      updatedAt: now,
      imageUrl: input.imageUrl ?? undefined,
    };

    memoryStore.products.unshift(record);

    return toProductDto(record);
  }

  async updateProduct(id: string, input: ProductMutationInput) {
    const existing = memoryStore.products.find((item) => item.id === id);

    if (!existing) {
      throw new AppError('Product not found in memory repository.', 404);
    }

    const category = memoryStore.categories.find((item) => item.slug === input.categorySlug);

    if (!category) {
      throw new AppError('Category not found in memory repository.', 404);
    }

    existing.name = input.name;
    existing.slug = slugify(input.name);
    existing.shortDescription = input.shortDescription;
    existing.description = input.description;
    existing.price = input.price;
    existing.inventory = input.inventory;
    existing.status = input.status;
    existing.featured = input.featured;
    existing.categoryId = category.id;
    existing.learningNotes = [...input.learningNotes];
    existing.imageUrl = input.imageUrl ?? undefined;
    existing.updatedAt = new Date().toISOString();

    return toProductDto(existing);
  }

  async deleteProduct(id: string) {
    const index = memoryStore.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new AppError('Product not found in memory repository.', 404);
    }

    memoryStore.products.splice(index, 1);
  }
}
