import { Router } from 'express';

import { prisma } from '../db/prisma.js';
import { catalogRouter } from '../modules/catalog/catalog.routes.js';
import { uploadsRouter } from '../modules/uploads/uploads.routes.js';

export const apiRouter = Router();

apiRouter.get('/health', async (_req, res) => {
  let databaseReachable = false;

  try {
    await prisma.$queryRaw`SELECT 1`;
    databaseReachable = true;
  } catch {
    databaseReachable = false;
  }

  res.json({
    success: true,
    data: {
      status: 'ok',
      availableModes: ['mock', 'api', 'db'],
      databaseReachable,
    },
  });
});

apiRouter.use('/', uploadsRouter);
apiRouter.use('/', catalogRouter);
