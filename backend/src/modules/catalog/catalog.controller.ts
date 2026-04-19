import type { RequestHandler } from 'express';

import { catalogService } from './catalog.service.js';
import { productListQuerySchema, repositoryModeSchema } from './catalog.schemas.js';

function getSingleValue(value: unknown) {
  return Array.isArray(value) ? value[0] : value;
}

const resolveMode = (value: unknown) => repositoryModeSchema.parse(getSingleValue(value) ?? 'api');

export const getCategoriesHandler: RequestHandler = async (req, res) => {
  const mode = resolveMode(req.query.mode);
  const categories = await catalogService.getCategories(mode);

  res.json({
    success: true,
    mode,
    data: categories,
  });
};

export const getProductsHandler: RequestHandler = async (req, res) => {
  const query = productListQuerySchema.parse(req.query);
  const mode = resolveMode(query.mode);
  const products = await catalogService.getProducts(mode, {
    category: query.category,
    search: query.search,
  });

  res.json({
    success: true,
    mode,
    data: products,
  });
};

export const getProductByIdHandler: RequestHandler = async (req, res) => {
  const mode = resolveMode(req.query.mode);
  const product = await catalogService.getProductById(mode, getSingleValue(req.params.id) ?? '');

  res.json({
    success: true,
    mode,
    data: product,
  });
};

export const createProductHandler: RequestHandler = async (req, res) => {
  const mode = resolveMode(req.query.mode);
  const product = await catalogService.createProduct(mode, req.body);

  res.status(201).json({
    success: true,
    mode,
    data: product,
  });
};

export const updateProductHandler: RequestHandler = async (req, res) => {
  const mode = resolveMode(req.query.mode);
  const product = await catalogService.updateProduct(
    mode,
    getSingleValue(req.params.id) ?? '',
    req.body,
  );

  res.json({
    success: true,
    mode,
    data: product,
  });
};

export const deleteProductHandler: RequestHandler = async (req, res) => {
  const mode = resolveMode(req.query.mode);
  await catalogService.deleteProduct(mode, getSingleValue(req.params.id) ?? '');

  res.status(204).send();
};
