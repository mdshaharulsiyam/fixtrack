import express from "express";
import rateLimit from "express-rate-limit";
import asyncWrapper from "../../middleware/asyncWrapper";
import validateRequest from "../../middleware/validateRequest";
import verifyToken from "../../middleware/verifyToken";
import { job_controller } from "./job_controller";
import { job_validate } from "./job_validate";

export const job_router = express.Router();

const trackLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: "Too many lookups, please try again in a minute",
    });
  },
});

job_router
  .post(
    "/job/create",
    verifyToken(),
    validateRequest(job_validate.create_validation),
    asyncWrapper(job_controller.create),
  )

  .get("/job/get-all", verifyToken(), asyncWrapper(job_controller.get_all))

  .patch(
    "/job/update/:id",
    verifyToken(),
    validateRequest(job_validate.update_validation),
    asyncWrapper(job_controller.update),
  )

  .patch(
    "/job/update-status/:id",
    verifyToken(),
    validateRequest(job_validate.update_status_validation),
    asyncWrapper(job_controller.update_status),
  )

  .get(
    "/job/track/:code",
    trackLimiter,
    validateRequest(job_validate.track_validation),
    asyncWrapper(job_controller.track),
  );
