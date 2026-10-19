import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";

export class CustomError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleZodError = (err: any): CustomError => {
  const message = err?.issues?.[0]?.message ?? "Invalid input data";
  return new CustomError(message, 400);
};

const handleCastError = (err: any): CustomError => {
  return new CustomError(`Invalid value for ${err.path}`, 400);
};

const handleDuplicateKeyError = (err: any): CustomError => {
  const keys = Object.keys(err?.keyValue ?? {});
  const message = keys.length
    ? `${keys.join(" & ")} already exists`
    : "Duplicate value";
  return new CustomError(message, 409);
};

const handleValidationError = (err: any): CustomError => {
  const errors = Object.values(err.errors).map((val: any) => val.message);
  return new CustomError(`Invalid input data: ${errors.join(". ")}`, 400);
};

const normalizeError = (error: any) => {
  if (error?.name === "ZodError") return handleZodError(error);
  if (error?.name === "CastError") return handleCastError(error);
  if (error?.code === 11000) return handleDuplicateKeyError(error);
  if (error?.name === "ValidationError") return handleValidationError(error);
  if (!error.statusCode) {
    error.statusCode =
      error instanceof Error && error.constructor === Error ? 400 : 500;
  }
  return error;
};

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(error);
  }

  const normalized = normalizeError(error || new Error("Something went wrong"));
  const statusCode: number = normalized.statusCode;

  if (statusCode >= 500) logger.error(normalized);

  const hideMessage =
    statusCode >= 500 &&
    !normalized.isOperational &&
    process.env.NODE_ENV !== "development";

  res.status(statusCode).send({
    success: false,
    message: hideMessage
      ? "Something went wrong! Please try again later."
      : normalized.message,
  });
};

export default globalErrorHandler;
