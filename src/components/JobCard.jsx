import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import JobCardsList from "./JobCardsList";

const departments = [
  "EEE",
  "Mechanical",
  "CS/IT",
  "Civil",
  "EC",
  "AI & Data Science",
  "Business",
  "Others",
];

function JobCard({ jobs, setJobs }) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loggedInRole = localStorage.getItem("loggedInRole");
  const [jobData, setJobData] = useState({
    department: "",
    role: "",
    company: "",
    experience: "",
    description: "",
    location: "",
    workType: "",
    salary: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!setJobs) return;

    const newJob = {
      id: Date.now(),  
      ...jobData,
      postedBy: loggedInUser,
    };
    setJobs([...jobs, newJob]);
    
    setJobData({
      department: "",
      role: "",
      company: "",
      experience: "",
      description: "",
      location: "",
      workType: "",
      salary: "",
      contact: "",
    });
  };

  const deleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  if (loggedInRole !== "teacher") {
    return (
      <Container className="mt-5 text-center">
        <h3>Only teachers can post jobs.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Post a Job</h2>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Job Department</Form.Label>
              <Form.Select
                name="department"
                value={jobData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Job Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Frontend Developer"
                name="role"
                value={jobData.role}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="ABC Technologies"
                name="company"
                value={jobData.company}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Experience Required</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 0–2 years"
                name="experience"
                value={jobData.experience}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Job Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bangalore / Remote"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Work Type</Form.Label>
              <Form.Select
                name="workType"
                value={jobData.workType}
                onChange={handleChange}
                required
              >
                <option value="">Select Work Type</option>
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Part-time">Part-time</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Salary Package</Form.Label>
              <Form.Control
                type="text"
                placeholder="6 LPA"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Contact Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="hr@company.com"
                name="contact"
                value={jobData.contact}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="danger" type="submit" className="mb-4">
          Post Job
        </Button>
      </Form>

      <h3 className="fw-bold mt-4">Job Listings</h3>
      <JobCardsList jobs={jobs} deleteJob={deleteJob} />
    </Container>
  );
}

export default JobCard;
