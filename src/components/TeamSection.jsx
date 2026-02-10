import { Container, Row, Col, Card } from "react-bootstrap";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Arjun Patel",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Michael Smith",
    role: "Mechanical Engineer",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Daniel Lee",
    role: "Electrical Engineer",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        {/* Heading */}
        <div className="text-center mb-5">
          <small className="text-danger fw-semibold">Success Stories</small>
          <h2 className="fw-bold mt-2">Students Placed in Top Companies</h2>
          <p className="text-muted mt-2">
            Where Talent Meets Opportunity
          </p>
        </div>

        {/* Team Cards */}
        <Row>
          {teamMembers.map((member, index) => (
            <Col key={index} lg={3} md={6} sm={12} className="mb-4">
              <Card className="border-0 shadow-sm h-100 text-center">
                <Card.Img
                  variant="top"
                  src={member.image}
                  className="p-3 rounded"
                  style={{ height: "280px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-semibold">
                    {member.name}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {member.role}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TeamSection;
