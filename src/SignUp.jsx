import { Container, Row, Col, Form, Button,Spinner } from "react-bootstrap";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
    // State for loading and form data
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if email already exists
      const userExists = users.find((u) => u.email === formData.email);
      if (userExists) {
        setError("User with this email already exists!");
        setLoading(false);
        return;
      }

      // Save new user to localStorage
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));

      setLoading(false);
      navigate("/signin");
    }, 1500);
  };


  return (
    <Container fluid className="vh-100 d-flex align-items-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={10} lg={8}>
          <Row className="shadow rounded overflow-hidden">
            
            {/* LEFT PANEL ( Welcome Back) */}
            <Col
              md={6}
              className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
              style={{
                background: "linear-gradient(to right, #ff416c, #ff4b2b)",
              }}
            >
              <h2 className="fw-bold">Welcome Back!</h2>
              <p className="text-center mt-3">
                To keep connected with us please login with your personal info
              </p>
              <Button variant="outline-light" className="mt-3" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
            </Col>

            {/* RIGHT PANEL (SIGN UP FORM) */}
            <Col md={6} className="p-5 bg-white">
              <h3 className="fw-bold text-center mb-3">Create Account</h3>

              {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

              {/* Social Icons */}
              <div className="d-flex justify-content-center gap-3 mb-3">
                <div className="border rounded-circle p-2">
                  <FaFacebookF />
                </div>
                <div className="border rounded-circle p-2">
                  <FaGoogle />
                </div>
                <div className="border rounded-circle p-2">
                  <FaLinkedinIn />
                </div>
              </div>

              <p className="text-center text-muted mb-4">
                or use your email for registration
              </p>

              <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Name" name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email" name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control type="password" placeholder="Password" name="password"
                    value={formData.password} 
                    onChange={handleChange}
                    required />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: "#ff4b2b",
                      border: "none",
                    }}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;