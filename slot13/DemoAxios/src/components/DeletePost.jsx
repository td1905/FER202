// src/components/DeletePost.jsx – NC1 + NC5 (Modal + Toast) + NC10 (optimistic update)
import React, { useState, useEffect } from 'react';
import {
  ListGroup, Button, Alert, Spinner, Modal,
  Toast, ToastContainer, Badge,
} from 'react-bootstrap';
import postApi from '../api/postApi';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmId, setConfirmId] = useState(null);   // NC5: Modal thay window.confirm
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  // NC1: async/await
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await postApi.getAll({ _limit: 5 });
        setPosts(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // NC10: optimistic update – xóa UI trước, rollback nếu lỗi
  const handleDelete = async () => {
    const id = confirmId;
    setConfirmId(null);
    const backup = [...posts];
    setPosts(prev => prev.filter(p => p.id !== id)); // xóa ngay (optimistic)
    try {
      const res = await postApi.remove(id);
      showToast(`Đã xóa bài #${id} – Status: ${res.status}`, 'success');
    } catch (err) {
      setPosts(backup); // rollback
      showToast(`Xóa thất bại: ${err.message}`, 'danger');
    }
  };

  const showToast = (message, variant) =>
    setToast({ show: true, message, variant });

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Lỗi: {error}</Alert>;

  return (
    <div>
      <h2>
        DELETE – Xóa bài viết{' '}
        <Badge bg="info" style={{ fontSize: '0.6em' }}>NC1+NC5+NC10</Badge>
      </h2>

      <ListGroup className="mb-3">
        {posts.map(post => (
          <ListGroup.Item key={post.id} className="d-flex align-items-center gap-2">
            <span className="flex-grow-1">
              <Badge bg="secondary" className="me-1">#{post.id}</Badge>
              {post.title}
            </span>
            {/* NC5: mở Modal thay window.confirm */}
            <Button size="sm" variant="danger" onClick={() => setConfirmId(post.id)}>
              Xóa
            </Button>
          </ListGroup.Item>
        ))}
        {posts.length === 0 && (
          <ListGroup.Item className="text-muted text-center">
            Đã xóa hết bài viết
          </ListGroup.Item>
        )}
      </ListGroup>

      {/* NC5: Modal xác nhận xóa */}
      <Modal show={confirmId !== null} onHide={() => setConfirmId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn xóa bài viết <strong>#{confirmId}</strong>?
          <br />
          <small className="text-muted">(Optimistic: xóa khỏi UI ngay, rollback nếu lỗi)</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmId(null)}>Hủy</Button>
          <Button variant="danger" onClick={handleDelete}>Xóa</Button>
        </Modal.Footer>
      </Modal>

      {/* NC5: Toast thông báo */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={toast.show}
          onClose={() => setToast(t => ({ ...t, show: false }))}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Body className="text-white fw-bold">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default DeletePost;
