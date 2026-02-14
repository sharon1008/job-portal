import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import "./HeroSearch.css";

const HeroSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleSearch = (e) => {
  e.preventDefault();

  const results = jobs.filter((job) => {
    const roleMatch = job.role
      .toLowerCase()
      .includes(keyword.toLowerCase());

    const locationMatch = job.location
      .toLowerCase()
      .includes(location.toLowerCase());

    return roleMatch && locationMatch;
  });

  navigate("/results", { state: { results } });
};


  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <p className="hero-subtitle">
                Find Jobs, Employment & Career Opportunities
              </p>
              <h1 className="hero-title">
                Drop Resume & Get <br /> Your Desired Job!
              </h1>

              <Form className="hero-search-form" onSubmit={handleSearch}>
                <Row className="g-2">
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Keywords"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Button variant="danger" type="submit" className="w-100 hero-btn">
                      FIND A JOB
                    </Button>
                  </Col>
                </Row>
              </Form>

              <p className="hero-footer-text">
                Trending Keywords: Automotive, Developer, Bussiness and software Engineering
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HeroSearch;
