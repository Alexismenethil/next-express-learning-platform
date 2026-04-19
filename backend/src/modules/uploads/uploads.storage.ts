import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import multer from 'multer';

import { AppError } from '../../lib/app-error.js';

const uploadsDirectoryPath = fileURLToPath(new URL('../../../uploads', import.meta.url));
const productUploadsDirectoryPath = path.join(uploadsDirectoryPath, 'products');

mkdirSync(productUploadsDirectoryPath, { recursive: true });

const supportedMimeTypes = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/gif', '.gif'],
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, productUploadsDirectoryPath);
  },
  filename: (_req, file, callback) => {
    const originalExtension = path.extname(file.originalname).toLowerCase();
    const extension = supportedMimeTypes.get(file.mimetype) ?? (originalExtension || '.png');
    callback(null, `${Date.now()}-${randomUUID()}${extension}`);
  },
});

function fileFilter(
  _req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
) {
  if (!supportedMimeTypes.has(file.mimetype)) {
    callback(new AppError('Only JPG, PNG, WEBP, and GIF images are allowed.', 400));
    return;
  }

  callback(null, true);
}

export const productImageUpload = multer({
  storage,
  limits: {
    fileSize: 6 * 1024 * 1024,
  },
  fileFilter,
});

export { uploadsDirectoryPath };
