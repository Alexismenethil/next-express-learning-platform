export type RepositoryMode = 'api' | 'db';

export type CategoryDto = {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string | null;
};

export type ProductDto = {
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
  categorySlug: string;
  categoryName: string;
  learningNotes: string[];
  createdAt: string;
  updatedAt: string;
  imageUrl?: string | null;
};

export type ProductMutationInput = {
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  inventory: number;
  status: string;
  featured: boolean;
  categorySlug: string;
  learningNotes: string[];
  imageUrl?: string | null;
};

export type ProductListQuery = {
  category?: string;
  search?: string;
};

export interface CatalogRepository {
  getCategories(): Promise<CategoryDto[]>;
  getProducts(query?: ProductListQuery): Promise<ProductDto[]>;
  getProductById(idOrSlug: string): Promise<ProductDto | null>;
  createProduct(input: ProductMutationInput): Promise<ProductDto>;
  updateProduct(id: string, input: ProductMutationInput): Promise<ProductDto>;
  deleteProduct(id: string): Promise<void>;
}
