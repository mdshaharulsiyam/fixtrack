import { isValidObjectId } from "mongoose";
import { z } from "zod";
import config from "../../DefaultConfig/config";

const text = (field: string, max: number) =>
  z
    .string({ required_error: `${field} is required`, invalid_type_error: `${field} should be a string` })
    .trim()
    .min(1, `${field} is required`)
    .max(max, `${field} is too long`);

const phone_schema = z
  .string({ required_error: "customer phone is required", invalid_type_error: "customer phone should be a string" })
  .transform((value) => value.replace(/[\s()-]/g, ""))
  .refine((value) => config.PHONE_PATTERN.test(value), "Enter a valid phone number, e.g. +8801712345678");

const job_fields = {
  customer_name: text("customer name", 100),
  customer_phone: phone_schema,
  device: text("device", 100),
  problem: text("problem", 1000),
  category: z.enum(config.JOB_CATEGORY, {
    required_error: "category is required",
    invalid_type_error: "choose a valid category",
  }),
  likely_fault: z.string().trim().max(300, "likely fault is too long").optional(),
  estimated_cost: z
    .number({ required_error: "estimated cost is required", invalid_type_error: "estimated cost should be a number" })
    .positive("Estimated cost must be greater than 0")
    .max(10_000_000, "estimated cost is too large"),
};

const id_params = z.object({
  id: z.string().refine((value) => isValidObjectId(value), "Invalid job id"),
});

const create_validation = z.object({
  body: z.object(job_fields).strict(),
});

const update_validation = z.object({
  params: id_params,
  body: z
    .object(job_fields)
    .partial()
    .strict()
    .refine((value) => Object.keys(value).length > 0, "Nothing to update"),
});

const update_status_validation = z.object({
  params: id_params,
  body: z.object({
    status: z.enum(config.JOB_STATUS, {
      required_error: "status is required",
      invalid_type_error: "Invalid status",
    }),
  }),
});

const track_validation = z.object({
  params: z.object({
    code: z
      .string()
      .trim()
      .toUpperCase()
      .regex(config.JOB_CODE_PATTERN, "Enter a valid job code, e.g. FX-1042"),
  }),
});

export const job_validate = Object.freeze({
  create_validation,
  update_validation,
  update_status_validation,
  track_validation,
});
