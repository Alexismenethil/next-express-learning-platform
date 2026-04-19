import { Router } from 'express';

import { uploadProductImageHandler } from './uploads.controller.js';
import { productImageUpload } from './uploads.storage.js';

export const uploadsRouter = Router();

uploadsRouter.post('/uploads/product-image', productImageUpload.single('file'), uploadProductImageHandler);
