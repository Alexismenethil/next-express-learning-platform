import cors from 'cors';
import express from 'express';

import { corsOrigins } from './config/env.js';
import { errorHandler } from './middlewares/error-handler.js';
import { notFoundMiddleware } from './middlewares/not-found.js';
import { apiRouter } from './routes/index.js';

function matchesCorsOrigin(origin: string, allowedOrigin: string) {
  if (allowedOrigin.includes('*')) {
    const pattern = allowedOrigin
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');

    return new RegExp(`^${pattern}$`).test(origin);
  }

  return origin === allowedOrigin;
}

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }

        const isAllowed =
          corsOrigins.length === 0 ||
          corsOrigins.some((allowedOrigin) => matchesCorsOrigin(origin, allowedOrigin));

        if (isAllowed) {
          callback(null, true);
          return;
        }

        callback(new Error(`Origin ${origin} is not allowed by CORS.`));
      },
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
