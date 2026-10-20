import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, ProgressBar, Badge, Row, Col } from 'react-bootstrap';

const QuizList = ({
  totalQuestions,
  answeredCount,
  score,
  isSubmitted,
  onSubmitQuiz,
  onResetQuiz,
}) => {
  const percentCompleted = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <Card className="mb-4 shadow-sm border-0 bg-light">
      <Card.Body className="p-4">
        {/* React Router Links requirement: In Home and QuizList components, use Link from React Router to create links to the respective pages */}
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 pb-3 border-bottom">
          <div className="d-flex gap-3 align-items-center flex-wrap">
            <span className="fw-semibold text-secondary">Liên kết nhanh:</span>
            <Link to="/" className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-house-door me-1"></i> Trang chủ (Home)
            </Link>
            <Link to="/products" className="btn btn-sm btn-outline-warning text-dark">
              <i className="bi bi-bag-check me-1"></i> Sản phẩm (Products)
            </Link>
            <Link to="/news" className="btn btn-sm btn-outline-primary">
              <i className="bi bi-newspaper me-1"></i> Tin tức (News)
            </Link>
            <Link to="/about" className="btn btn-sm btn-outline-info">
              <i className="bi bi-info-circle me-1"></i> Giới thiệu (About)
            </Link>
            <Link to="/contact" className="btn btn-sm btn-outline-success">
              <i className="bi bi-envelope me-1"></i> Liên hệ (Contact)
            </Link>
          </div>
          <Badge bg="dark" className="p-2 fs-6">
            Lab 5: Online Quiz
          </Badge>
        </div>

        <Row className="align-items-center">
          <Col md={7}>
            <h4 className="fw-bold text-dark mb-1">
              Bài Trắc Nghiệm: React Router & State Management
            </h4>
            <p className="text-muted mb-2">
              Hãy chọn câu trả lời đúng nhất cho các câu hỏi bên dưới. Nhấn "Nộp bài" để xem điểm và giải thích.
            </p>
            <div className="d-flex align-items-center gap-3">
              <span className="small text-muted">
                Tiến độ: <strong>{answeredCount} / {totalQuestions}</strong> câu
              </span>
              <ProgressBar
                now={percentCompleted}
                label={`${percentCompleted}%`}
                className="flex-grow-1"
                style={{ height: '14px' }}
                variant={percentCompleted === 100 ? 'success' : 'primary'}
              />
            </div>
          </Col>

          <Col md={5} className="text-md-end mt-3 mt-md-0">
            {isSubmitted ? (
              <div className="d-flex flex-column align-items-md-end gap-2">
                <div className="fs-5 fw-bold text-success">
                  Điểm của bạn: {score} / {totalQuestions} (
                  {Math.round((score / totalQuestions) * 100)}%)
                </div>
                <Button variant="warning" onClick={onResetQuiz} className="px-4">
                  <i className="bi bi-arrow-counterclockwise me-1"></i> Làm lại Quiz
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={onSubmitQuiz}
                disabled={answeredCount === 0}
                className="px-4 shadow-sm"
              >
                <i className="bi bi-check-circle me-1"></i> Nộp bài kiểm tra
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default QuizList;
