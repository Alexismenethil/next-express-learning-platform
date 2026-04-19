import cors from 'cors';
import express from 'express';

import { env } from './config/env.js';
import { errorHandler } from './middlewares/error-handler.js';
import { notFoundMiddleware } from './middlewares/not-found.js';
import { apiRouter } from './routes/index.js';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
    }),
  );
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({
      service: 'Product Catalog Learning Platform API',
      docsHint: 'Use /api/health or /api/products?mode=api|db',
    });
  });

  app.use('/api', apiRouter);
  app.use(notFoundMiddleware);
  app.use(errorHandler);

  return app;
}
