import express from "express";
import rateLimit from "express-rate-limit";
import asyncWrapper from "../../middleware/asyncWrapper";
import validateRequest from "../../middleware/validateRequest";
import verifyToken from "../../middleware/verifyToken";
import { suggestion_controller } from "./suggestion_controller";
import { suggestion_validate } from "./suggestion_validate";

export const suggestion_router = express.Router();

const suggestionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: "Too many suggestion requests, please wait a minute",
    });
  },
});

suggestion_router.post(
  "/suggestion/repair",
  verifyToken(),
  suggestionLimiter,
  validateRequest(suggestion_validate.suggest_validation),
  asyncWrapper(suggestion_controller.suggest),
);
