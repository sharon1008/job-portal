import { useLocation, Link,useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Search Results</h2>
          {results.length > 0 ? (
            results.map((job) => (
              <div key={job.id} className="p-3 border rounded mb-2"
              style={{ cursor: "pointer" }}
              onClick={() =>{console.log(job); navigate(`/jobs/${job.id}`)}}
              >
              
                <h5>{job.role}</h5>
                <p>{job.location}</p>
                <p className="text-muted">{job.salary ? `Salary: ${job.salary}` : ""}</p>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}

          <Link to="/">
            <Button variant="secondary" className="mt-3">Back</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResults;
