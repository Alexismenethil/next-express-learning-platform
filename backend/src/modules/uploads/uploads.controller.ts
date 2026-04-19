import type { RequestHandler } from 'express';

import { AppError } from '../../lib/app-error.js';

export const uploadProductImageHandler: RequestHandler = (req, res) => {
  if (!req.file) {
    throw new AppError('No image file was received.', 400);
  }

  res.status(201).json({
    success: true,
    data: {
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      url: `/uploads/products/${req.file.filename}`,
    },
  });
};
