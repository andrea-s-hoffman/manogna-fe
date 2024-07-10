import { createContext } from "react";
import Job from "../models/Job";

interface JobContextModel {
  jobList: Job[];
  updateFilteredJobs: (
    industry: string | undefined,
    geo: string | undefined,
    tag: string | undefined
  ) => void;
}

const defaultValues: JobContextModel = {
  jobList: [],
  updateFilteredJobs: () => {},
};

const jobListContext = createContext<JobContextModel>(defaultValues);

export default jobListContext;
