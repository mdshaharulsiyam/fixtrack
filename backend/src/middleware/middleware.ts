import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import rateLimit from "express-rate-limit";
import config from "../DefaultConfig/config";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).send({ success: false, message: "Too many requests" });
  },
});

const middleware = (app: Express) => {
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: config.ALLOWED_ORIGIN,
      optionsSuccessStatus: 200,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ extended: true, limit: "100kb" }));
  app.use(cookieParser());
  app.use(limiter);
};

export default middleware;
