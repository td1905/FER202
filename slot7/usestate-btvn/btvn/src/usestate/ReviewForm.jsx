// src/usestate/ReviewForm.jsx
import { useState } from 'react';
import { Container, Card, Form, Button, ListGroup } from 'react-bootstrap';
import StarRating from './StarRating';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  // Dữ liệu dẫn xuất (không lưu vào state)
  const canSubmit = rating > 0 && comment.trim().length >= 5;
  const totalCount = reviews.length;
  const average = totalCount === 0
    ? '0.0'
    : (reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newReview = {
      id: Date.now(),
      rating,
      comment: comment.trim(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setRating(0);
    setComment('');
  };

  return (
    <Container className="my-4" style={{ maxWidth: '600px' }}>
      <h4 className="mb-3">Bài 2: Đánh giá & Nhận xét</h4>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="h5 mb-3">
            Trung bình {average}/5 ({totalCount} lượt)
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="d-block fw-bold">Chọn đánh giá:</Form.Label>
              <StarRating value={rating} onChange={setRating} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Nhận xét:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập tối thiểu 5 ký tự..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!canSubmit}>
              Gửi đánh giá
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h5 className="mb-3">Danh sách đánh giá</h5>
      {reviews.length === 0 ? (
        <p className="text-muted">Chưa có đánh giá nào.</p>
      ) : (
        <ListGroup>
          {reviews.map((rev) => (
            <ListGroup.Item key={rev.id}>
              <div className="d-flex align-items-center gap-1 mb-1">
                <span style={{ color: '#ffc107', fontSize: '1.2rem' }}>
                  {'★'.repeat(rev.rating)}
                </span>
                <span style={{ color: '#e4e5e9', fontSize: '1.2rem' }}>
                  {'★'.repeat(5 - rev.rating)}
                </span>
              </div>
              <div>{rev.comment}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}