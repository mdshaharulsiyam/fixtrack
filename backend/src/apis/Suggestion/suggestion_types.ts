import { JobCategory } from "../Job/job_types";

export interface ISuggestion {
  category: JobCategory;
  likely_fault: string;
}
