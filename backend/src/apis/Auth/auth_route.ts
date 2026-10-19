import express from "express";
import rateLimit from "express-rate-limit";
import asyncWrapper from "../../middleware/asyncWrapper";
import validateRequest from "../../middleware/validateRequest";
import verifyToken from "../../middleware/verifyToken";
import { auth_controller } from "./auth_controller";
import { auth_validate } from "./auth_validate";

export const auth_router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: "Too many login attempts, please try again after 15 minutes",
    });
  },
});

auth_router
  .post(
    "/auth/sign-up",
    loginLimiter,
    validateRequest(auth_validate.sign_up_validation),
    asyncWrapper(auth_controller.create),
  )

  .post(
    "/auth/sign-in",
    loginLimiter,
    validateRequest(auth_validate.login_validation),
    asyncWrapper(auth_controller.sign_in),
  )

  .get("/auth/profile", verifyToken(), asyncWrapper(auth_controller.get_profile))

  .post("/auth/logout", asyncWrapper(auth_controller.sign_out));
