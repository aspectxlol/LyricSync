import type { NextFunction, Request, Response } from "express";
import { ZodError, type z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateData(schema: z.ZodObject<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
      }))
        res.status(400).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}