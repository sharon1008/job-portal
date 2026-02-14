import { Card, Button, Row, Col,Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./JobCardsList.css";

function JobCardsList({ jobs=[], deleteJob }) {
  const navigate = useNavigate();

  if (!jobs.length) {
    return <p className="text-center">No jobs posted yet.</p>;
  }
  return (
    <Row  className="g-4">
      
      {jobs.map((job, index) => (
        <Col md={4} key={index} xs={12} sm={6} lg={3}>
          <Card
            className="job-card h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/jobs/${job.id}`)} //job details
          >

            <Card.Body>
              <Card.Title>{job.role}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{job.department}</Card.Subtitle>
              <p className="mb-1">
                <strong>Location:</strong> {job.location}
              </p>

              <p className="mb-2">
                <strong>Work Type:</strong>{" "}
                <Badge
                  bg={
                    job.workType === "Remote"
                      ? "success"
                      : job.workType === "Onsite"
                      ? "primary"
                      : "warning"
                  }
                >
                  {job.workType}
                </Badge>
              </p>

              <p>
                <strong>Salary:</strong> {job.salary}
              </p>

              {deleteJob && (
                <Button variant="danger" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  deleteJob(index);
              }}>
                  Delete Job
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default JobCardsList;