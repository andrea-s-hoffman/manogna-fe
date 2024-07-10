import { useState, useEffect, ReactNode } from "react";
import { getAllJobs } from "../services/jobsService";
import Job from "../models/Job";
import jobListContext from "./JobContext";

interface Props {
  children: ReactNode;
}

export const JobProvider = ({ children }: Props) => {
  const [jobsList, setjobsList] = useState<Job[]>([]);

  useEffect(() => {
    getAllJobs().then((res) => {
      setjobsList(res);
      console.log(res);
    });
  }, []);

  const updateFilteredJobs = (
    industry?: string,
    country?: string,
    tag?: string
  ) => {
    getAllJobs(industry, country, tag).then((res) => {
      setjobsList(res);
    });
  };

  return (
    <jobListContext.Provider
      value={{
        jobList: jobsList,
        updateFilteredJobs: updateFilteredJobs,
      }}
    >
      {children}
    </jobListContext.Provider>
  );
};

export default JobProvider;
