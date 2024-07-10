import { useContext, useEffect, useState } from "react";
import { deleteJob, getAllJobsFromDb } from "../services/jobFromDbService";
import "./css/AppTracker.css";
import Header from "./Header";
import JobData from "../models/JobData";
import he from "he";
import userContext from "../context/UserContext";
import UserData from "../models/UserData";
import { addUserData } from "../services/userDataService";
// import app from "../firebaseConfig";
// import { getDatabase, ref, set, push } from "firebase/database";

const AppTracker = () => {
  const [appliedJobs, setAppliedJobs] = useState<JobData[]>([]);
  const [interviewedJobs, setinterViewedJobs] = useState<JobData[]>([]);
  const [offeredJobs, setOfferedJobs] = useState<JobData[]>([]);
  const [rejectedJobs, setRejectedJobs] = useState<JobData[]>([]);
  const [userJobList, setUserJobList] = useState<JobData[]>([]);
  const copyOfAppliedJobs = [...appliedJobs];

  const { user } = useContext(userContext);

  useEffect(() => {
    getAllJobsFromDb().then((res) => {
      if (res) {
        setAppliedJobs(res);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const newEntry: UserData = {
        userId: user.uid,
        jobsList: userJobList,
      };
      addUserData(newEntry);
    }
  }, [user, userJobList]);

  const handleOnDrag = (e: React.DragEvent, job: JobData) => {
    e.dataTransfer.setData("job", JSON.stringify(job));
  };

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const newJob: JobData = JSON.parse(e.dataTransfer.getData("job"));
    newJob.status = "interviewed";
    const id = newJob._id;

    //updating applied jobs list for user's database

    let indexOfjobToUpdate = copyOfAppliedJobs.findIndex(
      (job) => job._id === id
    );
    if (indexOfjobToUpdate !== 1) {
      copyOfAppliedJobs[indexOfjobToUpdate] = newJob;
    }

    setAppliedJobs(copyOfAppliedJobs);
    setUserJobList(appliedJobs);

    setinterViewedJobs((prev) => [...prev, newJob]);
  };

  const handleOnDropToOffered = async (e: React.DragEvent) => {
    e.preventDefault();
    const newJob: JobData = JSON.parse(e.dataTransfer.getData("job"));
    newJob.status = "offered";
    const id = newJob._id;

    setinterViewedJobs(interviewedJobs.filter((job) => job._id !== id));
    setRejectedJobs(rejectedJobs.filter((job) => job._id !== id));
    setOfferedJobs((prevOfferedJobs) => [...prevOfferedJobs, newJob]);
  };

  const handleOnDropToRejected = async (e: React.DragEvent) => {
    e.preventDefault();
    const newJob: JobData = JSON.parse(e.dataTransfer.getData("job"));
    newJob.status = "rejected";
    const id = newJob._id;
    setinterViewedJobs(interviewedJobs.filter((job) => job._id !== id));
    setOfferedJobs(offeredJobs.filter((job) => job._id !== id));

    setRejectedJobs((prevRejectedJobs) => [...prevRejectedJobs, newJob]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="kanban">
        <div className="column applied">
          <h2>Applied</h2>
          {appliedJobs.map((job) => (
            <div
              className="job-details"
              key={job._id}
              draggable
              onDragStart={(e) => handleOnDrag(e, job)}
            >
              <h3>{job.companyName}</h3>
              <h4>
                {job.jobTitle} | {he.decode(job.jobIndustry)}
              </h4>
              <p>Time applied: {job.timeApplied}</p>
              <a>
                <p>{job.jobURL}</p>
              </a>
            </div>
          ))}
        </div>
        <div
          className="column interviewed"
          onDrop={handleOnDrop}
          onDragOver={handleDragOver}
        >
          <h2>Interviewed</h2>
          {interviewedJobs.map((job) => {
            return (
              <div
                className="job-details"
                key={job._id}
                draggable
                onDragStart={(e) => handleOnDrag(e, job)}
              >
                <h3>{job.companyName}</h3>
                <h4>
                  {job.jobTitle} | {he.decode(job.jobIndustry)}
                </h4>
                <p>Time applied: {job.timeApplied}</p>
                <a>
                  <p>{job.jobURL}</p>
                </a>
              </div>
            );
          })}
        </div>
        <div
          className="column offered"
          onDrop={handleOnDropToOffered}
          onDragOver={handleDragOver}
        >
          <h2>Offered</h2>
          {offeredJobs.map((job) => {
            return (
              <div
                className="job-details"
                key={job._id}
                draggable
                onDragStart={(e) => handleOnDrag(e, job)}
              >
                <h3>{job.companyName}</h3>
                <h4>
                  {job.jobTitle} | {he.decode(job.jobIndustry)}
                </h4>
                <p>Time applied: {job.timeApplied}</p>
                <a>
                  <p>{job.jobURL}</p>
                </a>
              </div>
            );
          })}
        </div>
        <div
          className="column rejected"
          onDrop={handleOnDropToRejected}
          onDragOver={handleDragOver}
        >
          <h2>Rejected</h2>
          {rejectedJobs.map((job) => {
            return (
              <div
                className="job-details"
                key={job._id}
                draggable
                onDragStart={(e) => handleOnDrag(e, job)}
              >
                <h3>{job.companyName}</h3>
                <h4>
                  {job.jobTitle} | {he.decode(job.jobIndustry)}
                </h4>
                <p>Time applied: {job.timeApplied}</p>
                <a>
                  <p>{job.jobURL}</p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AppTracker;
function setSourceState(arg0: any) {
  throw new Error("Function not implemented.");
}
