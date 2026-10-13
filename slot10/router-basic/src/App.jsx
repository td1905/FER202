import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const EventPage = () => {
  const navigate = useNavigate();

  return (
    <Card className="text-center p-4">
      <Card.Body>
        <Card.Title as="h2">FPTU Tech Day 2026</Card.Title>
        <Card.Text className="text-muted my-3">
          Sự kiện công nghệ thường niên quy tụ hàng trăm chuyên gia và sinh viên CNTT.
        </Card.Text>
        <Button variant="success" size="lg" onClick={() => navigate('/register')}>
          Đăng ký ngay
        </Button>
      </Card.Body>
    </Card>
  );
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', session: 'Sáng' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = form.name.trim();

    if (!trimmedName) {
      setError('Vui lòng nhập họ và tên.');
      return;
    }
    if (!form.email.includes('@')) {
      setError('Email không hợp lệ (cần chứa ký tự @).');
      return;
    }

    setError('');
    navigate('/success', {
      state: { ...form, name: trimmedName },
      replace: true,
    });
  };

  return (
    <Card className="p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <Card.Title>Biểu mẫu đăng ký tham gia</Card.Title>
      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Buổi tham dự</Form.Label>
          <Form.Select name="session" value={form.session} onChange={handleChange}>
            <option value="Sáng">Sáng (08:00 - 11:30)</option>
            <option value="Chiều">Chiều (13:30 - 17:00)</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-between pt-2">
          <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
          <Button variant="primary" type="submit">
            Gửi đăng ký
          </Button>
        </div>
      </Form>
    </Card>
  );
};

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return <Navigate to="/register" replace />;
  }

  return (
    <Card className="p-4 mx-auto text-center" style={{ maxWidth: '550px' }}>
      <Card.Body>
        <Card.Title as="h3" className="text-success">Đăng ký thành công!</Card.Title>
        <Card.Text className="my-3">
          Cảm ơn <strong>{data.name}</strong>, vé tham dự đã được gửi tới hòm thư <strong>{data.email}</strong>.
        </Card.Text>
        <p className="text-muted">Buổi tham gia đăng ký: <strong>{data.session}</strong></p>
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button variant="outline-primary" onClick={() => navigate('/register')}>
            Đăng ký thêm người khác
          </Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            Về trang sự kiện
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default function App() {
  return (
    <Container className="p-4">
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Container>
  );
}