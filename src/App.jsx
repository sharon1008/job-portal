import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import CategoriesSection from "./components/CategoriesSection";
import Footer from "./components/Footer";
import HeroSearch from "./components/HeroSearch";
import MainNavbar from "./components/MainNavbar";
import TeamSection from "./components/TeamSection";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import JobCard from "./components/JobCard";
import JobCardsList from "./components/JobCardsList";
import CategoryJobs from "./components/CategoryJobs";
import JobDetails from "./components/JobDetails";
import SearchResults from "./components/SearchResult";


function App() {
  
  //Load jobs from localStorage
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  //Save jobs to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);
   
  return (
    <Router>
      <MainNavbar />
      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <HeroSearch />
               <CategoriesSection/>
              
              <div className="container mt-4 mb-5">
                <h3 id="jobs-section" className="mb-4 text-center">Latest Jobs</h3>
                <JobCardsList jobs={jobs} />
              </div>


              {/* <h3 id="jobs-section" className="fw-bold text-center">Latest Jobs</h3>
              <JobCardsList  jobs={jobs} /> display jobs on home page */}
              
              <TeamSection />
              <Footer />
             
            </>
            
          }
        />
        <Route path="/results" element={<SearchResults />} />
        {/* CATEGORY PAGE */}
        <Route
          path="/category/:categoryName"
          element={<CategoryJobs jobs={jobs} />}
        />
        <Route path="/postjob" element={<JobCard jobs={jobs} setJobs={setJobs} />} />
        {/* <Route path="/jobs/:id" element={<JobDetails jobs={jobs} />} /> */}
        <Route path="/jobs/:id" element={<JobDetails />} />


        {/* AUTH PAGES */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/postjob"
          element={<JobCard jobs={jobs} setJobs={setJobs} />} 
        />
        
      </Routes>
    </Router>
  );
}

export default App;
