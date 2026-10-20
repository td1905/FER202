import React from 'react';
import { Container, Row, Col, Card, Accordion, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Container className="pb-5">
      <h2 style={{ color: '#c9302c' }} className="fw-normal mb-4">
        About This Application
      </h2>

      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm p-4 bg-light h-100">
            <h4 className="fw-bold text-dark mb-3">
              Lab 5: React Router & Online Quiz Application
            </h4>
            <p className="text-muted leading-relaxed">
              Đây là bài tập thực hành số 5 (Lab 5) thuộc môn học <strong>FER202 - Front-End Web Development</strong>.
              Ứng dụng được xây dựng theo kiến trúc SPA (Single Page Application) sử dụng <strong>React Router v7</strong>{' '}
              và thư viện giao diện <strong>React-Bootstrap</strong>.
            </p>

            <h5 className="fw-bold mt-3 mb-2">Các Tính Năng Chính:</h5>
            <ul className="text-secondary">
              <li>
                <strong>Định tuyến client-side (Client-side Routing):</strong> Chuyển trang mượt mà giữa Trang chủ, Tin tức, Quiz, Giới thiệu và Liên hệ mà không tải lại toàn bộ trang web.
              </li>
              <li>
                <strong>Slide trình diễn (Home Carousel):</strong> Banner hình ảnh món ăn & sự kiện sống động với điều khiển tương tác.
              </li>
              <li>
                <strong>Chuyên mục tin tức (News Category):</strong> Hiển thị danh sách tin tức từ mảng đối tượng `newLists` với bố cục thẻ Card 4 cột chuẩn responsive.
              </li>
              <li>
                <strong>Hệ thống trắc nghiệm trực tuyến (Online Quiz):</strong> Tách component câu hỏi độc lập (`QuestionItem`), quản lý trạng thái chọn câu hỏi, chấm điểm tự động và hiển thị giải thích chi tiết.
              </li>
              <li>
                <strong>Form liên hệ có kiểm tra tính hợp lệ (Form Validation):</strong> Xây dựng bằng React-Bootstrap với đầy đủ phản hồi hợp lệ / không hợp lệ theo thời gian thực.
              </li>
            </ul>

            <div className="d-flex gap-3 mt-4 pt-3 border-top flex-wrap">
              <Link to="/quiz" className="btn btn-primary">
                <i className="bi bi-play-circle me-1"></i> Bắt đầu làm Quiz
              </Link>
              <Link to="/news" className="btn btn-outline-danger">
                <i className="bi bi-newspaper me-1"></i> Xem mục Tin tức
              </Link>
              <Link to="/contact" className="btn btn-outline-success">
                <i className="bi bi-envelope me-1"></i> Gửi biểu mẫu liên hệ
              </Link>
            </div>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm p-4 h-100 bg-white">
            <h5 className="fw-bold text-dark mb-3">Thông Tin Công Nghệ</h5>
            <div className="mb-3">
              <span className="text-muted d-block small">Framework UI:</span>
              <Badge bg="primary" className="me-1">React 19</Badge>
              <Badge bg="dark" className="me-1">Vite</Badge>
              <Badge bg="secondary">React-Bootstrap 2.10</Badge>
            </div>
            <div className="mb-3">
              <span className="text-muted d-block small">Routing:</span>
              <Badge bg="info" className="text-white">React Router v7</Badge>
            </div>
            <div className="mb-3">
              <span className="text-muted d-block small">Icons & Styling:</span>
              <Badge bg="success" className="me-1">Bootstrap 5.3</Badge>
              <Badge bg="warning" className="text-dark">Bootstrap Icons</Badge>
            </div>
            <hr />
            <h6 className="fw-bold text-dark mb-2">Đường Dẫn Trong App:</h6>
            <div className="d-flex flex-column gap-2 small">
              <Link to="/" className="text-decoration-none">
                <i className="bi bi-chevron-right text-primary me-1"></i> / - Home Page
              </Link>
              <Link to="/news" className="text-decoration-none">
                <i className="bi bi-chevron-right text-primary me-1"></i> /news - News Category
              </Link>
              <Link to="/quiz" className="text-decoration-none">
                <i className="bi bi-chevron-right text-primary me-1"></i> /quiz - Online Quiz App
              </Link>
              <Link to="/contact" className="text-decoration-none">
                <i className="bi bi-chevron-right text-primary me-1"></i> /contact - Contact Form
              </Link>
              <Link to="/about" className="text-decoration-none">
                <i className="bi bi-chevron-right text-primary me-1"></i> /about - About Page
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      {/* FAQ Accordion */}
      <h4 className="fw-bold mb-3 mt-4">Câu Hỏi Thường Gặp (FAQs)</h4>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>1. React Router hoạt động như thế nào?</Accordion.Header>
          <Accordion.Body>
            React Router sử dụng HTML5 History API để đồng bộ giao diện người dùng với URL hiện tại trên thanh địa chỉ. Khi nhấp vào các liên kết (`Link` hoặc `NavLink`), URL thay đổi nhưng trình duyệt không thực hiện yêu cầu tải lại trang mới từ máy chủ, giúp trải nghiệm mượt mà và tức thì.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>2. Cách liên kết các trang bằng component Link?</Accordion.Header>
          <Accordion.Body>
            Thay vì sử dụng thẻ <code>&lt;a href="..."&gt;</code> truyền thống gây tải lại trang, chúng ta sử dụng component <code>&lt;Link to="..."&gt;</code> được cung cấp bởi React Router.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>3. Tại sao nên tách component QuestionItem như Lab 4?</Accordion.Header>
          <Accordion.Body>
            Việc tách <code>QuestionItem</code> thành component riêng biệt giúp code rõ ràng, tuân thủ nguyên lý Single Responsibility Principle (SRP), dễ dàng tái sử dụng và kiểm thử độc lập cho từng câu hỏi trong bài trắc nghiệm.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default About;
