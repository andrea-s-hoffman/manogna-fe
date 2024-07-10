export default interface JobData {
  _id?: string;
  companyName: string;
  jobTitle: string;
  jobIndustry: string;
  jobGeo?: string;
  jobURL?: string;
  status?: string;
  timeApplied?: string;
  notes?: string;
}
