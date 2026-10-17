import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HomeSlider from '../components/HomeSlider';

const Home = () => {
  const menuImages = [
    { id: 1, src: '/images/menu-01.jpg', alt: 'Steak & Fries' },
    { id: 2, src: '/images/menu-02.jpg', alt: 'Pepperoni Pizza' },
    { id: 3, src: '/images/menu-03.jpg', alt: 'Lemon Tea Set' },
    { id: 4, src: '/images/menu-04.jpg', alt: 'Cold Cuts Platter' },
    { id: 5, src: '/images/menu-05.jpg', alt: 'Fresh Salad' },
    { id: 6, src: '/images/menu-06.jpg', alt: 'Mushroom Pizza' },
  ];

  return (
    <Container className="pb-5">
      {/* 1. Slide on Home page */}
      <HomeSlider />

      {/* 2. Circular Food Images row from teacher's screenshot */}
      <div className="d-flex justify-content-between align-items-center my-4 py-2 flex-wrap gap-3">
        {menuImages.map((item) => (
          <div key={item.id} className="text-center">
            <img
              src={item.src}
              alt={item.alt}
              className="rounded-circle menu-circle-img shadow-sm"
            />
          </div>
        ))}
      </div>

      {/* 3. Red Title as shown in teacher's screenshot */}
      <h2 style={{ color: '#c9302c' }} className="fw-normal mb-4">
        This is Home Page
      </h2>

      {/* 4. React Router Link requirement: In Home and QuizList components, use Link from React Router to create links to the respective pages */}
      <Card className="border-0 shadow-sm bg-light mt-4">
        <Card.Body className="p-4">
          <h5 className="fw-bold text-dark mb-3">
            <i className="bi bi-compass me-2 text-primary"></i>
            Khám Phá Các Trang Trong Ứng Dụng (React Router Navigation)
          </h5>
          <Row xs={1} sm={2} md={5} className="g-3">
            <Col>
              <Card className="h-100 border text-center p-3 hover-card">
                <i className="bi bi-bag-check fs-1 text-primary mb-2"></i>
                <h6>Sản Phẩm</h6>
                <p className="text-muted small mb-3">Xem danh sách 10 sản phẩm công nghệ</p>
                <Link to="/products" className="btn btn-sm btn-primary mt-auto">
                  Xem Sản Phẩm <i className="bi bi-arrow-right"></i>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 border text-center p-3 hover-card">
                <i className="bi bi-question-circle fs-1 text-warning mb-2"></i>
                <h6>Online Quiz</h6>
                <p className="text-muted small mb-3">Làm bài trắc nghiệm tương tác React</p>
                <Link to="/quiz" className="btn btn-sm btn-outline-warning text-dark mt-auto">
                  Vào trang Quiz <i className="bi bi-arrow-right"></i>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 border text-center p-3 hover-card">
                <i className="bi bi-newspaper fs-1 text-danger mb-2"></i>
                <h6>Tin Tức Nổi Bật</h6>
                <p className="text-muted small mb-3">Xem danh sách tin tức & ẩm thực mới</p>
                <Link to="/news" className="btn btn-sm btn-outline-danger mt-auto">
                  Xem Tin Tức <i className="bi bi-arrow-right"></i>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 border text-center p-3 hover-card">
                <i className="bi bi-info-circle fs-1 text-info mb-2"></i>
                <h6>Về Chúng Tôi</h6>
                <p className="text-muted small mb-3">Tìm hiểu thông tin môn học & dự án</p>
                <Link to="/about" className="btn btn-sm btn-outline-info mt-auto">
                  Trang Giới Thiệu <i className="bi bi-arrow-right"></i>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 border text-center p-3 hover-card">
                <i className="bi bi-envelope fs-1 text-success mb-2"></i>
                <h6>Liên Hệ & Góp Ý</h6>
                <p className="text-muted small mb-3">Biểu mẫu liên hệ React-Bootstrap</p>
                <Link to="/contact" className="btn btn-sm btn-outline-success mt-auto">
                  Gửi Liên Hệ <i className="bi bi-arrow-right"></i>
                </Link>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
