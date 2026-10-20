// src/components/UpdatePost.jsx – NC1 (async/await) + NC5 (bootstrap)
import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Form, Button, Badge } from 'react-bootstrap';
import postApi from '../api/postApi';

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  // NC1: async/await trong useEffect
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postApi.getById(1);
        setPost(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;
    try {
      const res = await postApi.update(post.id, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      });
      setResult({ status: res.status, data: res.data });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error && !post) return <Alert variant="danger">Lỗi: {error}</Alert>;

  return (
    <div>
      <h2>
        PUT – Cập nhật bài viết #{post?.id}{' '}
        <Badge bg="info" style={{ fontSize: '0.6em' }}>NC1+NC5</Badge>
      </h2>

      <Form noValidate validated={validated} onSubmit={handleUpdate}>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={post.title}
            onChange={e => setPost({ ...post, title: e.target.value })}
            minLength={5}
            required
            isInvalid={validated && post.title.length < 5}
          />
          <Form.Control.Feedback type="invalid">Tiêu đề ≥ 5 ký tự</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={post.body}
            onChange={e => setPost({ ...post, body: e.target.value })}
            minLength={10}
            required
            isInvalid={validated && post.body.length < 10}
          />
          <Form.Control.Feedback type="invalid">Nội dung ≥ 10 ký tự</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="warning">Cập nhật (PUT)</Button>
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

export default UpdatePost;
