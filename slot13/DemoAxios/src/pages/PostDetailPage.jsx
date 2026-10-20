// src/pages/PostDetailPage.jsx – NC6: /posts/:id – chi tiết + PATCH + DELETE + bình luận
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Card, ListGroup, Button, Alert, Spinner,
  Badge, Form, InputGroup, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import postApi from '../api/postApi';

const PostDetailPage = () => {
  const { id } = useParams();       // NC6: useParams
  const navigate = useNavigate();   // NC6: useNavigate
  const [data, setData]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [patchTitle, setPatchTitle] = useState('');
  const [patching, setPatching] = useState(false);

  // NC3: tải song song tác giả + bình luận bằng Promise.allSettled
  useEffect(() => {
    const controller = new AbortController();
    const fetchAll = async () => {
      setLoading(true);
      try {
        const postRes = await postApi.getById(id, controller.signal);
        const post = postRes.data;
        setPatchTitle(post.title);

        const [userResult, commentsResult] = await Promise.allSettled([
          postApi.getUserById(post.userId, controller.signal),
          postApi.getComments(id, controller.signal),
        ]);
        setData({
          post,
          user: userResult.status === 'fulfilled' ? userResult.value.data : null,
          comments: commentsResult.status === 'fulfilled' ? commentsResult.value.data : [],
        });
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'CanceledError') return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
    return () => controller.abort();
  }, [id]);

  const [showDeleteModal, setShowDeleteModal] = useState(false); // NC5: Modal thay confirm

  // PATCH nhanh tiêu đề
  const handlePatch = async () => {
    setPatching(true);
    try {
      const res = await postApi.patch(id, { title: patchTitle });
      setData(prev => ({ ...prev, post: { ...prev.post, title: res.data.title } }));
    } catch (err) {
      setError(err.message);
    } finally {
      setPatching(false);
    }
  };

  // NC5 + NC6: DELETE + Modal + navigate với state
  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    try {
      await postApi.remove(id);
      navigate('/posts', { state: { message: `🗑 Đã xóa bài viết #${id}` } });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
  if (error && !data) return <Alert variant="danger">Lỗi: {error}</Alert>;
  if (!data) return null;

  return (
    <>
      <Button variant="outline-secondary" size="sm" className="mb-3" onClick={() => navigate(-1)}>
        ← Quay lại
      </Button>

      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Row className="align-items-start">
            <Col>
              <Badge bg="secondary" className="mb-2">#{data.post.id}</Badge>
              <Card.Title className="h4">{data.post.title}</Card.Title>
            </Col>
            <Col xs="auto">
              <Button
                size="sm"
                variant="outline-primary"
                as={Link}
                to={`/posts/${id}/edit`}
                className="me-2"
              >
                ✏ Sửa toàn bộ (PUT)
              </Button>
              {/* NC5: Nút mở Modal xác nhận xóa */}
              <Button size="sm" variant="danger" onClick={() => setShowDeleteModal(true)}>
                🗑 Xóa
              </Button>
            </Col>
          </Row>
          <Card.Text className="text-muted">{data.post.body}</Card.Text>
          {data.user && (
            <small className="text-secondary">
              Tác giả: <strong>{data.user.name}</strong> – {data.user.email}
            </small>
          )}
        </Card.Body>
      </Card>

      {/* Sửa nhanh tiêu đề (PATCH) */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">Sửa nhanh tiêu đề (PATCH)</Card.Subtitle>
          <InputGroup>
            <Form.Control
              value={patchTitle}
              onChange={e => setPatchTitle(e.target.value)}
            />
            <Button onClick={handlePatch} disabled={patching} variant="warning">
              {patching ? <Spinner size="sm" /> : 'Lưu'}
            </Button>
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Bình luận */}
      <h6>💬 Bình luận ({data.comments.length})</h6>
      <ListGroup>
        {data.comments.map(c => (
          <ListGroup.Item key={c.id}>
            <div className="fw-bold">{c.name}</div>
            <div className="text-muted small">{c.body}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* NC5: Modal xác nhận xóa thay cho window.confirm */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa bài viết <strong>#{id}</strong>? Thao tác này không thể hoàn tác.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Xóa bài</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostDetailPage;
