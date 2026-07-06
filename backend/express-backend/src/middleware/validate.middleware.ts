import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateRequest = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate body, query, and params if defined in the schema
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation Error',
          details: error.issues,
        });
        return;
      }
      next(error);
    }
  };
};
