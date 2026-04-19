import { Router } from 'express';

import { validateRequest } from '../../middlewares/validate-request.js';

import {
  createProductHandler,
  deleteProductHandler,
  getCategoriesHandler,
  getProductByIdHandler,
  getProductsHandler,
  updateProductHandler,
} from './catalog.controller.js';
import {
  productBodySchema,
  productIdSchema,
  productListQuerySchema,
} from './catalog.schemas.js';

export const catalogRouter = Router();

catalogRouter.get('/categories', validateRequest(productListQuerySchema, 'query'), getCategoriesHandler);
catalogRouter.get('/products', validateRequest(productListQuerySchema, 'query'), getProductsHandler);
catalogRouter.get('/products/:id', validateRequest(productIdSchema, 'params'), getProductByIdHandler);
catalogRouter.post('/products', validateRequest(productBodySchema), createProductHandler);
catalogRouter.put(
  '/products/:id',
  validateRequest(productIdSchema, 'params'),
  validateRequest(productBodySchema),
  updateProductHandler,
);
catalogRouter.delete(
  '/products/:id',
  validateRequest(productIdSchema, 'params'),
  deleteProductHandler,
);
