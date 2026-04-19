import type { Request, RequestHandler } from 'express';
import type { ZodTypeAny } from 'zod';

export function validateRequest(
  schema: ZodTypeAny,
  target: 'body' | 'params' | 'query' = 'body',
): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req[target as keyof Request]);

    if (!result.success) {
      next(result.error);
      return;
    }

    Object.assign(req[target as keyof Request], result.data);
    next();
  };
}
