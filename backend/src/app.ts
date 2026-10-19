import express, { NextFunction, Request, Response } from "express";
import middleware from "./middleware/middleware";
import { routeMiddleware } from "./middleware/routeMiddleware";
import { connectToDB } from "./db";
import { checkEnv } from "./DefaultConfig/checkEnv";
import globalErrorHandler, { CustomError } from "./utils/globalErrorHandler";

export const app = express();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send({ success: true, message: "ok" });
});

middleware(app);

// serverless hosts (Vercel) never run index.ts, so connect on the first request
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkEnv();
    await connectToDB();
    next();
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
});

routeMiddleware(app);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CustomError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use((error: any, req: Request, res: Response, next: NextFunction) =>
  globalErrorHandler(error, req, res, next),
);

export default app;
