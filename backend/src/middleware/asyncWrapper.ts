import { NextFunction, Request, Response } from "express";
import globalErrorHandler from "../utils/globalErrorHandler";

const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch((error) => {
      globalErrorHandler(error, req, res, next);
    });
  };
};

export default asyncWrapper;
