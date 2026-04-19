import { AppError } from '../../lib/app-error.js';

import { MemoryCatalogRepository } from './memory-catalog.repository.js';
import { PrismaCatalogRepository } from './prisma-catalog.repository.js';

import type {
  CatalogRepository,
  ProductListQuery,
  ProductMutationInput,
  RepositoryMode,
} from './catalog.types.js';

const memoryRepository = new MemoryCatalogRepository();
const prismaRepository = new PrismaCatalogRepository();

export class CatalogService {
  private getRepository(mode: RepositoryMode): CatalogRepository {
    return mode === 'db' ? prismaRepository : memoryRepository;
  }

  private async withRepository<T>(
    mode: RepositoryMode,
    action: (repository: CatalogRepository) => Promise<T>,
  ) {
    try {
      return await action(this.getRepository(mode));
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      if (mode === 'db') {
        throw new AppError(
          'Database mode is enabled, but PostgreSQL is not ready yet. Run Prisma migrations and seed data first.',
          503,
        );
      }

      throw error;
    }
  }

  async getCategories(mode: RepositoryMode) {
    return this.withRepository(mode, (repository) => repository.getCategories());
  }

  async getProducts(mode: RepositoryMode, query?: ProductListQuery) {
    return this.withRepository(mode, (repository) => repository.getProducts(query));
  }

  async getProductById(mode: RepositoryMode, idOrSlug: string) {
    return this.withRepository(mode, async (repository) => {
      const product = await repository.getProductById(idOrSlug);

      if (!product) {
        throw new AppError('Product not found.', 404);
      }

      return product;
    });
  }

  async createProduct(mode: RepositoryMode, input: ProductMutationInput) {
    return this.withRepository(mode, (repository) => repository.createProduct(input));
  }

  async updateProduct(mode: RepositoryMode, id: string, input: ProductMutationInput) {
    return this.withRepository(mode, (repository) => repository.updateProduct(id, input));
  }

  async deleteProduct(mode: RepositoryMode, id: string) {
    return this.withRepository(mode, (repository) => repository.deleteProduct(id));
  }
}

export const catalogService = new CatalogService();
