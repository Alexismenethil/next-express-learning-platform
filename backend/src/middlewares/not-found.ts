import type { RequestHandler } from 'express';

import { AppError } from '../lib/app-error.js';

export const notFoundMiddleware: RequestHandler = (_req, _res, next) => {
  next(new AppError('Route not found.', 404));
};
