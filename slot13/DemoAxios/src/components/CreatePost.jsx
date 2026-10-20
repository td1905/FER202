// src/components/CreatePost.jsx – NC1 (async/await) + NC5 (bootstrap form validation)
import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import postApi from '../api/postApi';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);

  // NC1: async/await thay cho .then/.catch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return; // NC5: validation

    setSubmitting(true);
    setError(null);
    try {
      const res = await postApi.create({ title, body, userId: 1 });
      setResult({ status: res.status, data: res.data });
      setTitle('');
      setBody('');
      setValidated(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>
        POST – Tạo bài viết{' '}
        <Badge bg="info" style={{ fontSize: '0.6em' }}>NC1+NC5</Badge>
      </h2>

      {/* NC5: Form với isInvalid + Form.Control.Feedback */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
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

        <Form.Group className="mb-2">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
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

        <Button type="submit" disabled={submitting}>
          {submitting
            ? <><Spinner size="sm" className="me-1" />Đang gửi...</>
            : 'Tạo bài viết'}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-2">Lỗi: {error}</Alert>}
      {result && (
        <Alert variant="success" className="mt-2">
          <Alert.Heading>Status: {result.status}</Alert.Heading>
          <pre className="mb-0">{JSON.stringify(result.data, null, 2)}</pre>
        </Alert>
      )}
    </div>
  );
};

export default CreatePost;
