// src/pages/NotFoundPage.jsx – NC6: route * (trang 404)
import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Container } from 'react-bootstrap';

const NotFoundPage = () => (
  <Container className="text-center mt-5">
    <div style={{ fontSize: '5rem' }}>🔍</div>
    <Alert variant="warning" className="mt-3">
      <Alert.Heading>404 – Không tìm thấy trang</Alert.Heading>
      <p>Đường dẫn bạn truy cập không tồn tại.</p>
      <Button as={Link} to="/posts" variant="primary">
        ← Về trang danh sách
      </Button>
    </Alert>
  </Container>
);

export default NotFoundPage;
