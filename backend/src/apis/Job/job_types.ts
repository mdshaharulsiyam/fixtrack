import { Document, Types } from "mongoose";
import config from "../../DefaultConfig/config";

export type JobStatus = (typeof config.JOB_STATUS)[number];
export type JobCategory = (typeof config.JOB_CATEGORY)[number];

export interface IJob extends Document {
  customer_name: string;
  customer_phone: string;
  device: string;
  problem: string;
  category: JobCategory;
  likely_fault: string;
  estimated_cost: number;
  status: JobStatus;
  job_code: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJobInput {
  customer_name: string;
  customer_phone: string;
  device: string;
  problem: string;
  category: JobCategory;
  likely_fault?: string;
  estimated_cost: number;
}

export interface IJobListQuery {
  search?: string;
  status?: string;
  page?: string;
  limit?: string;
}
