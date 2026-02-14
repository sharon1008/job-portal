import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
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

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedInUser") ? true : false
  );
  
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
      <MainNavbar 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
      />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
          {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <SignUp />
            )
          }
        />

        {/* SIGNIN */}
        <Route
          path="/signin"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <SignIn setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        {/* HOME PAGE */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
            <>
              
              <HeroSearch />
               <CategoriesSection/>
              
              <div className="container mt-4 mb-5">
                <h3 id="jobs-section" className="mb-4 text-center fw-bold">Latest Jobs</h3>
                <JobCardsList jobs={jobs} />
              </div>
              
              <TeamSection />
              <Footer />
             
            </>
            ):(
              <Navigate to="/signin" />
            )
          }
        />

        <Route
          path="/results"
          element={
            isLoggedIn ? <SearchResults /> : <Navigate to="/signin" />
          }
        />

        <Route
          path="/category/:categoryName"
          element={
            isLoggedIn ? (
              <CategoryJobs jobs={jobs} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        <Route
          path="/postjob"
          element={
            isLoggedIn && localStorage.getItem("loggedInRole") === "teacher" ? (
              <JobCard jobs={jobs} setJobs={setJobs} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        <Route
          path="/jobs/:id"
          element={
            isLoggedIn ? <JobDetails jobs={jobs} setJobs={setJobs}/> : <Navigate to="/signin" />
          }
        />       
              </Routes>
            </Router>
          );
        }

export default App;
