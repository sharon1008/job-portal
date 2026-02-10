import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  GeoAltFill,
  EnvelopeFill,
} from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer id="contact" style={{ backgroundColor: "#0F172A" }} className=" text-light pt-5 pb-3">
      <Container>
        <Row className="mb-4">
          {/* Logo & Description */}
          <Col md={3} sm={12} className="mb-4">
            <h4 className="fw-bold text-White">JobPortal</h4>
            <p className="text-secondary small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore.
            </p>

            <div className="d-flex gap-3">
              <Facebook />
              <Twitter />
              <Instagram />
              <Linkedin />
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={3} sm={6} className="mb-4">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled text-secondary">
              <li>About Us</li>
              <li>Courses</li>
              <li>Teachers</li>
              <li>Pricing</li>
              <li>Contact</li>
            </ul>
          </Col>

          {/* Useful Links */}
          <Col md={3} sm={6} className="mb-4">
            <h6 className="fw-semibold mb-3">Useful Links</h6>
            <ul className="list-unstyled text-secondary">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Disclaimer</li>
              <li>Support</li>
              <li>FAQ</li>
            </ul>
          </Col>

          {/* Contact Us */}
            <Col md={3} sm={12}>
            <h6 className="fw-semibold mb-3 text-white">Contact Us</h6>

            <p className="small text-white mb-2">
                <i className="bi bi-geo-alt-fill me-2"></i>
                St. Sunset Road No.815, Kuta
            </p>

            <p className="small text-white mb-2">
                <i className="bi bi-envelope-fill me-2"></i>
                support@domain.com
            </p>

            <p className="small text-white">
                <i className="bi bi-telephone-fill me-2"></i>
                +91 98765 43210
            </p>
            </Col>

        </Row>

        {/* Bottom */}
        <hr className="border-secondary" />
        <p className="text-center small mb-0">
          © 2026 All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
