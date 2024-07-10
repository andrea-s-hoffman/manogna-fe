export default interface Job {
  id: number;
  url: string;
  jobTitle: string;
  companyLogo: string;
  companyName: string;
  jobIndustry: string[];
  jobType: string;
  jobGeo: string;
  jobExcerpt: string;
  jobDescription: string;
  pubDate: string;
  annualSalaryMin?: string;
  annualSalaryMax?: string;
  salaryCurrency?: string;
}
