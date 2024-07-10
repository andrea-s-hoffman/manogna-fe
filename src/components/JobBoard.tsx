import { useContext, useState } from "react";
import "./css/jobBoard.css";
import he from "he";
import JobFilter from "./JobFilter";
import jobListContext from "../context/JobContext";
import errorImg from "../assets/error.png";
import Header from "./Header";
import { Link } from "react-router-dom";
import JobData from "../models/JobData";
import { addJob, getAllJobs } from "../services/jobFromDbService";

const JobBoard = () => {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const { jobList } = useContext(jobListContext);

  const knowMore = (jobId: number) => {
    setSelectedJobId(jobId);
  };

  const closeKnowMore = () => {
    setSelectedJobId(null);
  };

  const addJobToDb = async (jobApplied: JobData) => {
    jobApplied.timeApplied = new Date().toString();
    addJob(jobApplied);
  };

  return (
    <>
      <Header />
      <JobFilter />
      <div className="jobBoard">
        {jobList ? (
          jobList.map((job) => (
            <div key={job.id}>
              <div className="job-card">
                <h3>{job.companyName}</h3>
                <img src={job.companyLogo} />
                <h4>{he.decode(job.jobTitle)}</h4>
                <h4>
                  {job.jobType} | {job.jobIndustry.map((ind) => he.decode(ind))}
                </h4>
                <h4>{job.jobGeo}</h4>
                {job.annualSalaryMin ? (
                  <h4>
                    {job.annualSalaryMin} {" " + job.salaryCurrency} -{" "}
                    {job.annualSalaryMax}
                    {" " + job.salaryCurrency}
                  </h4>
                ) : (
                  <></>
                )}
                <p>{he.decode(job.jobExcerpt)}</p>
                {selectedJobId === job.id && (
                  <div className="know-more">
                    <h2>{job.companyName}</h2>
                    <h3>Job Description</h3>
                    <button onClick={closeKnowMore}>X</button>
                    <div
                      className="job-description"
                      dangerouslySetInnerHTML={{
                        __html: he.decode(job.jobDescription),
                      }}
                    ></div>
                  </div>
                )}
                <button onClick={() => knowMore(job.id)}>Know more</button>
                <Link to={job.url} target="_blank">
                  <button
                    onClick={() => {
                      const jobApplied: JobData = {
                        companyName: job.companyName,
                        jobTitle: job.jobTitle,
                        jobIndustry: job.jobIndustry[0],
                        jobGeo: job.jobGeo,
                        jobURL: job.url,
                        status: "applied",
                      };
                      addJobToDb(jobApplied);
                    }}
                  >
                    Apply
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="error-container">
            <p>
              Oops! No jobs found matching that combination. Try a different
              country and industry for a more fruitful hunt!
            </p>
            <img src={errorImg} />
          </div>
        )}
      </div>
    </>
  );
};

export default JobBoard;
