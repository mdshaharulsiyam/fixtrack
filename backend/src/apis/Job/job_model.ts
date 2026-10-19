import { Schema, model } from "mongoose";
import config from "../../DefaultConfig/config";
import { INITIAL_JOB_STATUS } from "./job_status";
import { IJob } from "./job_types";

const job_schema = new Schema<IJob>(
  {
    customer_name: {
      type: String,
      required: [true, "customer name is required"],
      trim: true,
    },
    customer_phone: {
      type: String,
      required: [true, "customer phone is required"],
      trim: true,
      match: [config.PHONE_PATTERN, "Enter a valid phone number"],
    },
    device: {
      type: String,
      required: [true, "device is required"],
      trim: true,
    },
    problem: {
      type: String,
      required: [true, "problem is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: config.JOB_CATEGORY,
      required: [true, "category is required"],
    },
    likely_fault: {
      type: String,
      trim: true,
      default: "",
    },
    estimated_cost: {
      type: Number,
      required: [true, "estimated cost is required"],
      validate: {
        validator: (value: number) => value > 0,
        message: "Estimated cost must be greater than 0",
      },
    },
    status: {
      type: String,
      enum: config.JOB_STATUS,
      default: INITIAL_JOB_STATUS,
    },
    job_code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "auth",
      required: true,
      index: true,
    },
  },
  { timestamps: true, versionKey: false },
);

job_schema.index({ user: 1, createdAt: -1 });

export const job_model = model<IJob>("job", job_schema);
