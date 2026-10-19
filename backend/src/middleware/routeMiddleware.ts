import { Express } from "express";
import { auth_router } from "../apis/Auth/auth_route";
import { job_router } from "../apis/Job/job_route";
import { suggestion_router } from "../apis/Suggestion/suggestion_route";

export const routeMiddleware = (app: Express) => {
  app.use(auth_router);
  app.use(job_router);
  app.use(suggestion_router);
};
