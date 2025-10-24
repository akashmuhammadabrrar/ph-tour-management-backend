import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

// ✅ Middleware for validation
export const validateRequest =
  (zodSchema: ZodObject<ZodRawShape>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await zodSchema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };