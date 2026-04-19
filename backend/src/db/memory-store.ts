import { seedCategories, seedProducts } from './seed-data.js';

export type MemoryCategoryRecord = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export type MemoryProductRecord = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  inventory: number;
  status: string;
  featured: boolean;
  categoryId: string;
  learningNotes: string[];
  createdAt: string;
  updatedAt: string;
};

const initialTimestamp = new Date().toISOString();

function buildInitialState() {
  const categories: MemoryCategoryRecord[] = seedCategories.map((category) => ({
    ...category,
  }));

  const products: MemoryProductRecord[] = seedProducts.map((product) => ({
    ...product,
    learningNotes: [...product.learningNotes],
    createdAt: initialTimestamp,
    updatedAt: initialTimestamp,
  }));

  return { categories, products };
}

export class MemoryStore {
  private state = buildInitialState();

  get categories() {
    return this.state.categories;
  }

  get products() {
    return this.state.products;
  }

  reset() {
    this.state = buildInitialState();
  }
}

export const memoryStore = new MemoryStore();
