import config from "../../DefaultConfig/config";
import { JobStatus } from "./job_types";

export const INITIAL_JOB_STATUS: JobStatus = config.JOB_STATUS[0];

export const get_next_status = (current: JobStatus): JobStatus | null => {
  const index = config.JOB_STATUS.indexOf(current);
  if (index === -1) return null;
  return config.JOB_STATUS[index + 1] ?? null;
};

export const can_move_status = (current: JobStatus, next: JobStatus) => {
  return get_next_status(current) === next;
};
