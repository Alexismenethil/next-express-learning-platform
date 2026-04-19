import { z } from 'zod';

export const repositoryModeSchema = z.enum(['api', 'db']).default('api');

export const productListQuerySchema = z.object({
  mode: repositoryModeSchema.optional(),
  category: z.string().trim().optional(),
  search: z.string().trim().optional(),
});

export const productIdSchema = z.object({
  id: z.string().min(1),
});

export const productBodySchema = z.object({
  name: z.string().min(2).max(80),
  shortDescription: z.string().min(4).max(140),
  description: z.string().min(8).max(800),
  price: z.coerce.number().positive(),
  inventory: z.coerce.number().int().min(0),
  status: z.enum(['draft', 'published']),
  featured: z.coerce.boolean().default(false),
  categorySlug: z.string().min(2).max(60),
  learningNotes: z.array(z.string().min(2).max(120)).min(1).max(4),
  imageUrl: z.string().trim().min(1).max(240).optional(),
});
