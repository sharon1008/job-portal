import { Link,useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function MainNavbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/signin");
  };
  return (
    <Navbar style={{ backgroundColor: "#0F172A" }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">JobPortal</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="#jobs-section">Jobs</Nav.Link>
            {localStorage.getItem("loggedInRole") === "teacher" && (
              <Nav.Link as={Link} to="/postjob">Post Job</Nav.Link>
            )}

            <Nav.Link href="/home#contact">Contact</Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            {isLoggedIn ? (
              <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline-light" size="sm">
                    Sign In
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button variant="danger" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
 
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
