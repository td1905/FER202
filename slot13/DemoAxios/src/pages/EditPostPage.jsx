// src/pages/EditPostPage.jsx – NC6: /posts/:id/edit – sửa toàn bộ (PUT)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import postApi from '../api/postApi';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState(null);
  const [validated, setValidated] = useState(false);

  // GET bài viết hiện tại
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postApi.getById(id);
        setPost(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;

    setSubmitting(true);
    setError(null);
    try {
      // PUT: gửi đầy đủ tất cả trường
      await postApi.update(id, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      });
      navigate(`/posts/${id}`, { state: { message: '✅ Cập nhật thành công!' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error && !post) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <h2 className="mb-3">Sửa bài viết #{post?.id} (PUT)</h2>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
              <Form.Control
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
                minLength={5}
                required
                isInvalid={validated && post.title.length < 5}
              />
              <Form.Control.Feedback type="invalid">Tiêu đề ≥ 5 ký tự</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
                minLength={10}
                required
                isInvalid={validated && post.body.length < 10}
              />
              <Form.Control.Feedback type="invalid">Nội dung ≥ 10 ký tự</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="warning" disabled={submitting}>
                {submitting
                  ? <><Spinner size="sm" className="me-1" />Đang lưu...</>
                  : 'Lưu thay đổi (PUT)'}
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate(`/posts/${id}`)}>
                Hủy
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditPostPage;
