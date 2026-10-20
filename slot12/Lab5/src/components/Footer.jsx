import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light border-top py-4 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <span className="text-muted">
              © {new Date().getFullYear()} FER202 - Lab 5: React Router & Online Quiz Application.
            </span>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <Link to="/" className="text-decoration-none text-muted">Trang chủ</Link>
              <span className="text-muted">|</span>
              <Link to="/about" className="text-decoration-none text-muted">Giới thiệu</Link>
              <span className="text-muted">|</span>
              <Link to="/news" className="text-decoration-none text-muted">Tin tức</Link>
              <span className="text-muted">|</span>
              <Link to="/quiz" className="text-decoration-none text-muted">Quiz</Link>
              <span className="text-muted">|</span>
              <Link to="/contact" className="text-decoration-none text-muted">Liên hệ</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
