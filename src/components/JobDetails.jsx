import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Container, Badge, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(undefined);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const foundJob = jobs.find((j) => String(j.id) === id);
    setJob(foundJob || null);
  }, [id]);

  if (job === undefined) return <p className="text-center mt-5">Loading...</p>;
  if (!job)
    return (
      <Container className="mt-5 text-center">
        <h3>Job not found</h3>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    );

  const handleApply = () => {
    setShowModal(true);
    setSuccess(false);
    setResumeFile(null);
  };

  const handleSubmit = () => {
    if (!resumeFile) {
      alert("Please upload your resume before submitting!");
      return;
    }
    setSuccess(true);
  };

  return (
    <Container className="mt-5">
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card className="shadow-lg border-0">
        <Card.Body>
          <Card.Title className="fs-3">{job.role}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {job.company} • {job.department}
          </Card.Subtitle>

          <Badge bg={job.workType === "Remote" ? "success" : "primary"} className="mb-3">
            {job.workType}
          </Badge>

          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Experience:</strong> {job.experience}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Contact:</strong> {job.contact}</p>

          <Button variant="danger" onClick={handleApply}>Apply Now</Button>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {job.role}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? (
            <p className="text-success text-center fs-5">
              Your application submitted successfully!
            </p>
          ) : (
            <Form>
              <Form.Group controlId="resumeUpload" className="mb-3">
                <Form.Label>Upload Your Resume</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!success && (
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default JobDetails;
