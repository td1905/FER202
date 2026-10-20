import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="text-center py-5 my-5">
      <h1 className="display-1 fw-bold text-danger mb-2">404</h1>
      <h3 className="fw-semibold mb-3">Trang không tồn tại</h3>
      <p className="text-muted mb-4">
        Đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link to="/" className="btn btn-primary px-4 py-2">
        <i className="bi bi-house-door me-2"></i> Trở về Trang chủ
      </Link>
    </Container>
  );
};

export default NotFound;
