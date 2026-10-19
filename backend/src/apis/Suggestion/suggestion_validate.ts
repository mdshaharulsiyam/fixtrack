import { z } from "zod";

const suggest_validation = z.object({
  body: z.object({
    complaint: z
      .string({ required_error: "complaint is required", invalid_type_error: "complaint should be a string" })
      .trim()
      .min(5, "describe the complaint in a few more words")
      .max(1000, "complaint is too long"),
  }),
});

export const suggestion_validate = Object.freeze({
  suggest_validation,
});
