import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { newLists } from '../data/news';

const News = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  // Helper to resolve public image path correctly
  const resolveImagePath = (path) => {
    if (!path) return '/images/event-1.jpg';
    if (path.startsWith('http') || path.startsWith('/')) return path;
    return `/${path}`;
  };

  return (
    <Container className="pb-5">
      {/* Title as shown in teacher's screenshot */}
      <h2 style={{ color: '#c9302c' }} className="fw-normal mb-4">
        News Category
      </h2>

      {/* Grid of 8 news items (4 columns per row on desktop) */}
      <Row xs={1} sm={2} md={4} className="g-4">
        {newLists.map((item) => {
          const imgSrc = resolveImagePath(item.images);
          return (
            <Col key={item.id}>
              <Card className="h-100 border shadow-sm news-item-card">
                <Card.Img
                  variant="top"
                  src={imgSrc}
                  alt={item.title}
                  style={{ height: '220px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <Card.Body className="d-flex flex-column p-3">
                  <Card.Title
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      lineHeight: '1.4',
                      color: '#212529',
                    }}
                  >
                    {item.title}
                  </Card.Title>

                  <Card.Text
                    style={{
                      fontSize: '0.875rem',
                      color: '#555',
                      flexGrow: 1,
                      marginTop: '8px',
                      lineHeight: '1.5',
                    }}
                  >
                    {item.description}
                  </Card.Text>

                  {/* Underlined link with title as shown in teacher's screenshot */}
                  <div className="mt-3">
                    <Link
                      to={`/news/${item.id}`}
                      onClick={(e) => {
                        // Open detail modal or navigate smoothly
                        e.preventDefault();
                        setSelectedNews(item);
                      }}
                      className="text-primary text-decoration-underline"
                      style={{ fontSize: '0.875rem', display: 'block', wordBreak: 'break-word' }}
                    >
                      {item.title}
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* News Detail Modal */}
      {selectedNews && (
        <Modal
          show={!!selectedNews}
          onHide={() => setSelectedNews(null)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-5 fw-bold text-dark">
              {selectedNews.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={resolveImagePath(selectedNews.images)}
              alt={selectedNews.title}
              className="w-100 rounded mb-3"
              style={{ maxHeight: '350px', objectFit: 'cover' }}
            />
            {selectedNews.category && (
              <Badge bg="secondary" className="mb-2">
                {selectedNews.category}
              </Badge>
            )}
            <p className="lead fs-6">{selectedNews.description}</p>
            <hr />
            <p className="text-muted small">
              Bài viết thuộc chuyên mục tin tức Lab 5 (React Router). Dữ liệu được quản lý tập trung từ mảng `newLists`.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedNews(null)}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default News;
