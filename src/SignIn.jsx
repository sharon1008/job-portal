import { Container, Row, Col, Form, Button,Spinner,Alert } from "react-bootstrap";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault(); // STOPS the automatic navigation/refresh
        setLoading(true);
        setError("");

        setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // setLoading(false);
        // navigate("/"); // Login success
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setIsLoggedIn(true);
        setLoading(false);
        navigate("/home");
      } else {
        setLoading(false);
        setError("Invalid email or password. Please register first.");
      }
    }, 1000);
  };
  
  return (
    <Container fluid className="vh-100 d-flex align-items-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={10} lg={8}>
          <Row className="shadow rounded overflow-hidden">

            {/* LEFT PANEL – SIGN IN FORM */}
            <Col md={6} className="bg-white p-5">
              <h3 className="fw-bold text-center mb-3">Sign in</h3>

              {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

              {/* Social icons */}
              <div className="d-flex justify-content-center gap-3 mb-3">
                <span className="border rounded-circle p-2">
                  <FaFacebookF />
                </span>
                <span className="border rounded-circle p-2">
                  <FaGoogle />
                </span>
                <span className="border rounded-circle p-2">
                  <FaLinkedinIn />
                </span>
              </div>

              <p className="text-center text-muted mb-4">
                or use your account
              </p>

              <Form onSubmit={handleSignIn}>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email"required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Password" required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <div className="text-center mb-3">
                  <a href="#" className="text-muted text-decoration-none">
                    Forgot your password?
                  </a>
                </div>

                <div className="d-grid">
                  <Button
                    type="submit" 
                    disabled={loading}
                    style={{
                      background: "#ff4b2b",
                      border: "none",
                      borderRadius: "20px",
                    }}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "SIGN IN"
                    )}
                  </Button>
                </div>
              </Form>
            </Col>

            {/* RIGHT PANEL – HELLO FRIEND */}
            <Col
              md={6}
              className="d-flex flex-column justify-content-center align-items-center text-white p-5"
              style={{
                background: "linear-gradient(to right, #ff416c, #ff4b2b)",
              }}
            >
              <h2 className="fw-bold mb-3">Hello, Friend!</h2>
              <p className="text-center mb-4">
                Enter your personal details and start journey with us
              </p>
              <Button
                variant="outline-light"
                style={{ borderRadius: "20px", padding: "6px 30px" }}
                onClick={() => navigate("/signup")}
              >
                SIGN UP
              </Button>
            </Col>

          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;