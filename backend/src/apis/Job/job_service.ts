import { HttpStatus } from "../../DefaultConfig/config";
import { CustomError } from "../../utils/globalErrorHandler";
import Queries, { SearchKeys } from "../../utils/Queries";
import { IAuth } from "../Auth/auth_types";
import { generate_job_code, normalize_job_code } from "./job_code";
import { job_model } from "./job_model";
import { can_move_status, get_next_status } from "./job_status";
import { IJob, IJobInput, IJobListQuery, JobStatus } from "./job_types";

const MAX_CODE_ATTEMPTS = 10;

const isDuplicateJobCode = (error: any) =>
  error?.code === 11000 && Boolean(error?.keyPattern?.job_code);

const jobNotFound = () => new CustomError("job not found", HttpStatus.NOT_FOUND);

async function create(data: IJobInput, auth: IAuth) {
  for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt++) {
    try {
      const result = await job_model.create({
        ...data,
        job_code: generate_job_code(),
        user: auth._id,
      });
      return {
        success: true,
        message: "job created successfully",
        data: result,
      };
    } catch (error) {
      if (!isDuplicateJobCode(error)) throw error;
    }
  }
  throw new CustomError(
    "could not generate a unique job code, please try again",
    HttpStatus.SERVER_ERROR,
  );
}

async function get_all(query: IJobListQuery, auth: IAuth) {
  const search = query.search?.trim() || "";
  const searchKeys: SearchKeys = search
    ? { customer_name: search, customer_phone: search, device: search, job_code: search }
    : {};

  return await Queries<IJob>(
    job_model,
    {
      page: query.page,
      limit: query.limit,
      user: auth._id,
      status: query.status,
    },
    searchKeys,
  );
}

async function update(id: string, data: Partial<IJobInput>, auth: IAuth) {
  const result = await job_model.findOneAndUpdate(
    { _id: id, user: auth._id },
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!result) throw jobNotFound();

  return {
    success: true,
    message: "job updated successfully",
    data: result,
  };
}

async function update_status(id: string, status: JobStatus, auth: IAuth) {
  const job = await job_model.findOne({ _id: id, user: auth._id }).lean();
  if (!job) throw jobNotFound();

  if (!can_move_status(job.status, status)) {
    const next = get_next_status(job.status);
    throw new CustomError(
      next
        ? `a job in "${job.status}" can only move to "${next}"`
        : `a "${job.status}" job cannot change status`,
      HttpStatus.CONFLICT,
    );
  }

  const result = await job_model.findOneAndUpdate(
    { _id: id, user: auth._id, status: job.status },
    { $set: { status } },
    { new: true },
  );

  if (!result) {
    throw new CustomError(
      "this job was updated by someone else, please refresh",
      HttpStatus.CONFLICT,
    );
  }

  return {
    success: true,
    message: `job moved to ${status}`,
    data: result,
  };
}

async function track(code: string) {
  const job = await job_model
    .findOne({ job_code: normalize_job_code(code) })
    .select("job_code status updatedAt")
    .lean();

  if (!job) {
    throw new CustomError(
      "we could not find a repair with that code",
      HttpStatus.NOT_FOUND,
    );
  }

  return {
    success: true,
    message: "job status fetched successfully",
    data: {
      job_code: job.job_code,
      status: job.status,
      updatedAt: job.updatedAt,
    },
  };
}

export const job_service = Object.freeze({
  create,
  get_all,
  update,
  update_status,
  track,
});
