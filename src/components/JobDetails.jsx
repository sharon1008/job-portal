import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Container, Badge, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

function JobDetails({ jobs, setJobs }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(undefined);

  // Modal states for students applying
  const [showModal, setShowModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const userRole = loggedInUser.role || "student";

  useEffect(() => {
    const foundJob = jobs.find((j) => String(j.id) === id);
    setJob(foundJob || null);
    setEditData(foundJob || {});
  }, [id, jobs]);

  if (job === undefined) return <p className="text-center mt-5">Loading...</p>;
  if (!job)
    return (
      <Container className="mt-5 text-center">
        <h3>Job not found</h3>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    );

  // STUDENT APPLY
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

  // TEACHER EDIT
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const updatedJobs = jobs.map((j) => (j.id === job.id ? editData : j));
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJob(editData);
    setIsEditing(false);
  };

  return (
    <Container className="mt-5">
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card className="shadow-lg border-0">
        <Card.Body>
          {isEditing ? (
            // EDIT MODE FOR TEACHERS
            <>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    value={editData.role}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={editData.company}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={editData.department}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    name="experience"
                    value={editData.experience}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={editData.location}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Work Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="workType"
                    value={editData.workType}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    name="salary"
                    value={editData.salary}
                    onChange={handleEditChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    value={editData.contact}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              </Form>
            </>
          ) : (
            <>
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
            </>
          )}
          {userRole === "teacher" ? (
            isEditing ? (
              <Button variant="success" className="mt-3 me-2" onClick={saveEdit}>
                Save
              </Button>
            ) : (
              <Button variant="warning" className="mt-3" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )
          ) : (
            <Button variant="danger" className="mt-3" onClick={handleApply}>
              Apply Now
            </Button>
          )}
        </Card.Body>
      </Card>

      {/* Modal for students */}
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
