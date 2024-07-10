import axios from "axios";
import JobData from "../models/JobData";

const baseURL: string = import.meta.env.VITE_BASE_URL || "BASE URL NOT FOUND";

export const getAllJobsFromDb = async (): Promise<JobData[] | void> => {
  try {
    const res = await axios.get(`${baseURL}`);
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};

export const addJob = async (job: JobData): Promise<JobData | void> => {
  try {
    const res = await axios.post(baseURL, job);
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};

export const deleteJob = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/jobs/${id}`);
  } catch (err) {
    console.log(err);
  }
};
