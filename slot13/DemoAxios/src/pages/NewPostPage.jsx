// src/pages/NewPostPage.jsx – NC6: /posts/new
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import postApi from '../api/postApi';

const NewPostPage = () => {
  const [title, setTitle]         = useState('');
  const [body, setBody]           = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState(null);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;

    setSubmitting(true);
    setError(null);
    try {
      await postApi.create({ title, body, userId: 1 });
      // NC6: navigate + thông báo qua state
      navigate('/posts', { state: { message: `✅ Tạo bài viết "${title}" thành công!` } });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="mb-3">Tạo bài viết mới</h2>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
              <Form.Control
                value={title}
                onChange={e => setTitle(e.target.value)}
                minLength={5}
                required
                placeholder="Nhập tiêu đề (≥ 5 ký tự)"
                isInvalid={validated && title.length < 5}
              />
              <Form.Control.Feedback type="invalid">
                Tiêu đề phải có ít nhất 5 ký tự.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={body}
                onChange={e => setBody(e.target.value)}
                minLength={10}
                required
                placeholder="Nhập nội dung (≥ 10 ký tự)"
                isInvalid={validated && body.length < 10}
              />
              <Form.Control.Feedback type="invalid">
                Nội dung phải có ít nhất 10 ký tự.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting
                  ? <><Spinner size="sm" className="me-1" />Đang tạo...</>
                  : 'Tạo bài viết (POST)'}
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate('/posts')}>
                Hủy
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default NewPostPage;
