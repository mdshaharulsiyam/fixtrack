import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import globalErrorHandler from "../utils/globalErrorHandler";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        params: req.params,
      });
      if (parsed.body) req.body = parsed.body;
      if (parsed.params) req.params = parsed.params;
      return next();
    } catch (error) {
      globalErrorHandler(error, req, res, next);
    }
  };
};

export default validateRequest;
