import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CategoriesSection.css";
import {
  FaBolt,          
  FaCogs,          
  FaLaptopCode,   
  FaHardHat,       
  FaMicrochip,      
  FaBrain,
  FaEllipsisH,
  FaBriefcase
} from "react-icons/fa";

const categories = [
  { icon: <FaBolt />, title: "EEE", jobs: "300 open positions" },
  { icon: <FaCogs />, title: "Mechanical", jobs: "210 open positions" },
  { icon: <FaLaptopCode />, title: "CS/IT", jobs: "180 open positions" },
  { icon: <FaHardHat />, title: "Civil", jobs: "120 open positions" },
  { icon: <FaMicrochip />, title: "EC", jobs: "150 open positions" },
  { icon: <FaBrain />, title: "AI & Data Science" },
  { icon: <FaBriefcase />, title: "Business", jobs: "120 open positions" },
  { icon: <FaEllipsisH />, title: "Others" },
];

const CategoriesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Choose Your Category</h2>
          <p className="text-muted">
            Browse jobs by category and find the right opportunity
          </p>
        </div>

        <Row className="g-4">
          {categories.map((cat, index) => (
            <Col key={index} md={3} sm={6}>
              <Card className="h-100 text-center category-card" role="button"
               onClick={() =>
                  navigate(`/category/${encodeURIComponent(cat.title)}`)}
              >
                <Card.Body>
                  <div className="category-icon mb-3">
                    {cat.icon}
                  </div>
                  <h6 className="fw-semibold">{cat.title}</h6>
                  <small className="text-muted">{cat.jobs}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CategoriesSection;