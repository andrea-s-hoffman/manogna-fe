import { FormEvent, useContext, useState } from "react";
import "./css/JobFilter.css";
import he from "he";
import jobListContext from "../context/JobContext";
import industriesData from "../assets/jobIndustries.json";
import { Industries } from "../models/Industries";
import Location from "../models/Location";
import locationData from "../assets/locations.json";
import sherpa from "../assets/background.png";

const JobFilter = () => {
  interface data {
    industries: Industries[];
  }

  interface location {
    locations: Location[];
  }

  const countries: location = locationData;
  const { updateFilteredJobs } = useContext(jobListContext);
  const [selectedInd, setSelectedInd] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [searchTag, setSearchTag] = useState<string | undefined>();
  const industries: data = industriesData;

  const handleSelect = (e: FormEvent) => {
    e.preventDefault();
    console.log(selectedInd, selectedCountry, searchTag);
    updateFilteredJobs(selectedInd, selectedCountry, searchTag);
  };

  return (
    <>
      <img src={sherpa} id="sherpa-theme" />
      <div className="filters">
        <h3>Your dream job is only a few clicks away.</h3>
        <form onSubmit={handleSelect}>
          <label htmlFor="industry">Industry: </label>
          <select
            name="industry"
            id="industry"
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedInd(e.target.value);
            }}
          >
            {industries.industries.map((ind) => (
              <option value={ind.industrySlug} key={ind.industryID}>
                {he.decode(ind.industryName)}
              </option>
            ))}
          </select>
          <label htmlFor="geo">Place: </label>
          <select
            name="geo"
            id="geo"
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedCountry(e.target.value);
            }}
          >
            {countries.locations.map((country) => (
              <option value={country.geoSlug} key={country.geoID}>
                {country.geoName}
              </option>
            ))}
          </select>
          <label htmlFor="tag">Search for technology/keywords:</label>
          <input
            type="text"
            id="tag"
            value={searchTag}
            placeholder="ex: 'python'"
            onChange={(e) => {
              setSearchTag(e.target.value);
            }}
          />
          <button type="submit">Find Jobs</button>
        </form>
      </div>
    </>
  );
};

export default JobFilter;
