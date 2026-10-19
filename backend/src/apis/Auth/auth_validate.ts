import { z } from "zod";

const email_schema = z
  .string({ required_error: "email is required", invalid_type_error: "email should be a string" })
  .trim()
  .toLowerCase()
  .email("Invalid email format");

const sign_up_validation = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required", invalid_type_error: "name should be a string" })
      .trim()
      .min(2, "name should be at least 2 characters")
      .max(100, "name is too long"),
    email: email_schema,
    password: z
      .string({ required_error: "password is required", invalid_type_error: "password should be a string" })
      .min(8, "password should be at least 8 characters")
      .max(72, "password is too long"),
    confirm_password: z.string({
      required_error: "confirm password is required",
      invalid_type_error: "confirm password should be a string",
    }),
  }),
});

const login_validation = z.object({
  body: z.object({
    email: email_schema,
    password: z.string({ required_error: "password is required", invalid_type_error: "password should be a string" }),
  }),
});

export const auth_validate = Object.freeze({
  sign_up_validation,
  login_validation,
});
