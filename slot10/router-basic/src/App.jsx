import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Card, ListGroup, Button, Row, Col } from 'react-bootstrap';

const HomePage = () => (
  <div className="py-4 text-center">
    <h2>Xin chào, mình là Sinh viên Kỹ thuật Phần mềm 👋</h2>
    <p className="text-muted">Chào mừng bạn đến với portfolio cá nhân của mình.</p>
    <Button as={Link} to="/projects" variant="primary">Xem dự án của mình</Button>
  </div>
);

const SkillsPage = () => (
  <div className="py-3">
    <h3>Kỹ năng chuyên môn</h3>
    <ListGroup className="mt-3">
      <ListGroup.Item>Frontend: ReactJS, HTML5, CSS3, Bootstrap</ListGroup.Item>
      <ListGroup.Item>Backend: Node.js, Express, Java Servlets</ListGroup.Item>
      <ListGroup.Item>Database: MongoDB, SQL Server</ListGroup.Item>
      <ListGroup.Item>Công cụ: Git, Postman, Vite</ListGroup.Item>
    </ListGroup>
  </div>
);

const ProjectsPage = () => (
  <div className="py-3">
    <h3>Dự án tiêu biểu</h3>
    <Row className="mt-3 g-3">
      {[1, 2, 3].map((num) => (
        <Col md={4} key={num}>
          <Card>
            <Card.Body>
              <Card.Title>Dự án {num}</Card.Title>
              <Card.Text>Ứng dụng web xây dựng bằng React và React-Bootstrap.</Card.Text>
              <Button variant="outline-primary" size="sm">Chi tiết</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

const ContactPage = () => (
  <div className="py-3">
    <h3>Liên hệ</h3>
    <p>Email: student@fe.edu.vn</p>
    <p>Điện thoại: 0123 456 789</p>
  </div>
);

const NotFoundPage = () => (
  <div className="py-5 text-center">
    <h2 className="text-danger">404 - Không tìm thấy trang</h2>
    <p>Đường dẫn bạn truy cập không tồn tại.</p>
    <Button as={Link} to="/" variant="secondary">Về trang chủ</Button>
  </div>
);

export default function App() {
  const MENU = [
    { to: '/', label: 'Trang chủ', end: true },
    { to: '/skills', label: 'Kỹ năng', end: false },
    { to: '/projects', label: 'Dự án', end: false },
    { to: '/contact', label: 'Liên hệ', end: false },
  ];

  return (
    <Container className="p-3">
      <Navbar bg="light" className="border rounded px-3 mb-3">
        <Navbar.Brand as={Link} to="/">Portfolio</Navbar.Brand>
        <Nav className="ms-auto">
          {MENU.map((item) => (
            <Nav.Link key={item.to} as={NavLink} to={item.to} end={item.end}>
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Container>
  );
}