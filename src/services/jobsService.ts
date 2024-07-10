import axios from "axios";
import Job from "../models/Job";

const baseURL: string =
  "https://jobicy.com/api/v2/remote-jobs" || "Base URL Not Found";

export const getAllJobs = (
  industry?: string,
  geo?: string,
  tag?: string
): Promise<Job[]> => {
  return axios
    .get(baseURL, {
      params: {
        industry,
        geo,
        tag,
      },
    })
    .then((res) => {
      console.log(res.data.jobs.statusCode);
      if (res.data.jobs.statusCode !== 404) {
        return res.data.jobs;
      }
    })
    .catch((error) => console.log(error));
};
