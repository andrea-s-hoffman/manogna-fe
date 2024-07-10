import { useContext, useEffect, useState } from "react";
import { getUserJobs, updateJob } from "../services/jobFromDbService";
import "./css/AppTracker.css";
import Header from "./Header";
import JobData from "../models/JobData";
import he from "he";
import userContext from "../context/UserContext";
// import app from "../firebaseConfig";
// import { getDatabase, ref, set, push } from "firebase/database";

const AppTracker = () => {
  const [accountJobs, setAccountJobs] = useState<JobData[]>([]);

  const { account } = useContext(userContext);

  useEffect(() => {
    if (account) {
      getUserJobs(account._id!).then((res) => {
        if (res) {
          setAccountJobs(res);
        }
      });
    }
  }, [account]);

  const handleOnDrag = (e: React.DragEvent, job: JobData) => {
    e.dataTransfer.setData("job", JSON.stringify(job));
  };

  const handleOnDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const newJob: JobData = JSON.parse(e.dataTransfer.getData("job"));
    newJob.status = newStatus;
    // const id = newJob._id;

    updateJob(newJob).then(() => {
      getUserJobs(account?._id!).then((res) => {
        if (res) setAccountJobs(res);
      });
    });
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
          {accountJobs
            .filter((j) => j.status === "applied")
            .map((job) => (
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
          onDrop={(e) => handleOnDrop(e, "interviewed")}
          onDragOver={handleDragOver}
        >
          <h2>Interviewed</h2>
          {accountJobs
            .filter((j) => j.status === "interviewed")
            .map((job) => {
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
          onDrop={(e) => handleOnDrop(e, "offered")}
          onDragOver={handleDragOver}
        >
          <h2>Offered</h2>
          {accountJobs
            .filter((j) => j.status === "offered")
            .map((job) => {
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
          onDrop={(e) => handleOnDrop(e, "rejected")}
          onDragOver={handleDragOver}
        >
          <h2>Rejected</h2>
          {accountJobs
            .filter((j) => j.status === "rejected")
            .map((job) => {
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
