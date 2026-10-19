import { randomInt } from "node:crypto";
import config from "../../DefaultConfig/config";

export const generate_job_code = () => {
  return `${config.JOB_CODE_PREFIX}-${randomInt(1000, 10000)}`;
};

export const normalize_job_code = (code: string) => code.trim().toUpperCase();
