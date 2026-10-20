// src/pages/PostsPage.jsx – NC5 (Modal + Toast) + NC6 (Router) + NC9 (debounce) + NC10 (bulk + optimistic)
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Table, Button, Spinner, Alert, Form, Pagination,
  InputGroup, Badge, Row, Col, Modal, Toast, ToastContainer,
} from 'react-bootstrap';
import axios from 'axios';
import postApi from '../api/postApi';

const PAGE_SIZE = 5;

const PostsPage = () => {
  const [posts, setPosts]               = useState([]);
  const [total, setTotal]               = useState(0);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [keyword, setKeyword]           = useState('');            // NC9: tìm kiếm có debounce
  const [selected, setSelected]         = useState(new Set());     // NC10.1: checkbox hàng loạt
  const [confirmId, setConfirmId]       = useState(null);         // NC5: Modal xác nhận xóa thay window.confirm
  const [confirmBulk, setConfirmBulk]   = useState(false);        // NC5: Modal xóa hàng loạt
  const [toast, setToast]               = useState({ show: false, message: '', variant: 'success' }); // NC5: Toast

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // NC6: đọc page, userId từ useSearchParams
  const page   = Number(searchParams.get('page')   || 1);
  const userId = searchParams.get('userId') || '';

  const showToast = (message, variant = 'success') =>
    setToast({ show: true, message, variant });

  // NC6 + NC9: Gọi API mỗi khi page/userId thay đổi; debounce 500ms cho keyword
  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { _page: page, _limit: PAGE_SIZE };
        if (userId) params.userId = userId;
        if (keyword.trim()) params.q = keyword.trim();

        const res = await postApi.getAll(params, controller.signal);
        setPosts(res.data);
        setTotal(Number(res.headers['x-total-count'] || res.data.length));
        setSelected(new Set()); // reset lựa chọn khi sang trang mới
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'CanceledError') return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // NC9: Sau khi ngừng gõ 500ms mới gọi API
    const timer = setTimeout(fetchPosts, keyword ? 500 : 0);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [page, userId, keyword]);

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

  // NC10.2: Xóa một bài theo kiểu optimistic update (xóa khỏi UI trước, lỗi thì khôi phục lại)
  const handleConfirmSingleDelete = async () => {
    const id = confirmId;
    setConfirmId(null);
    if (!id) return;

    const backup = [...posts];
    setPosts(prev => prev.filter(p => p.id !== id)); // xóa khỏi UI ngay (optimistic)

    try {
      await postApi.remove(id);
      showToast(`Đã xóa bài viết #${id} thành công!`, 'success');
      setTotal(prev => Math.max(0, prev - 1));
    } catch (err) {
      setPosts(backup); // khôi phục lại nếu server lỗi
      showToast(`Xóa thất bại: ${err.message}. Đã khôi phục dữ liệu.`, 'danger');
    }
  };

  // NC10.1: Thao tác hàng loạt – Gửi nhiều DELETE song song bằng Promise.allSettled
  const handleBulkDelete = async () => {
    setConfirmBulk(false);
    const ids = [...selected];
    if (ids.length === 0) return;

    // Gửi song song qua Promise.allSettled
    const results = await Promise.allSettled(ids.map(id => postApi.remove(id)));
    const successCount = results.filter(r => r.status === 'fulfilled').length;

    // Xóa những id đã thành công khỏi UI
    const fulfilledIds = new Set(
      ids.filter((_, idx) => results[idx].status === 'fulfilled')
    );
    setPosts(prev => prev.filter(p => !fulfilledIds.has(p.id)));
    setSelected(new Set());
    setTotal(prev => Math.max(0, prev - successCount));

    showToast(`Xóa thành công ${successCount}/${ids.length} bài viết!`, 'success');
  };

  // Quản lý checkbox
  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === posts.length && posts.length > 0) {
      setSelected(new Set());
    } else {
      setSelected(new Set(posts.map(p => p.id)));
    }
  };

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col>
          <h2 className="mb-0">
            Danh sách bài viết{' '}
            <Badge bg="info" style={{ fontSize: '0.5em' }}>NC5+NC6+NC9+NC10</Badge>
          </h2>
        </Col>
        <Col xs="auto">
          <Button as={Link} to="/posts/new" variant="primary">+ Tạo bài viết mới</Button>
        </Col>
      </Row>

      {/* NC9: Bộ lọc tìm kiếm có debounce + Lọc theo userId lưu trên URL */}
      <Row className="mb-3 g-2">
        <Col xs={12} md={5}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Tìm kiếm theo từ khóa (debounce 500ms)..."
              value={keyword}
              onChange={e => {
                setKeyword(e.target.value);
                setSearchParams({ page: 1, userId, ...(e.target.value ? { q: e.target.value } : {}) });
              }}
            />
            {keyword && (
              <Button variant="outline-secondary" onClick={() => { setKeyword(''); setSearchParams({ page: 1, userId }); }}>
                ✕
              </Button>
            )}
          </InputGroup>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select
            value={userId}
            onChange={e => setSearchParams({ page: 1, userId: e.target.value, ...(keyword ? { q: keyword } : {}) })}
          >
            <option value="">Tất cả tác giả</option>
            {[1, 2, 3].map(i => (
              <option key={i} value={i}>Tác giả #{i}</option>
            ))}
          </Form.Select>
        </Col>
        {selected.size > 0 && (
          <Col xs={12} md="auto" className="d-flex align-items-center gap-2">
            <Badge bg="secondary">{selected.size} đã chọn</Badge>
            <Button size="sm" variant="danger" onClick={() => setConfirmBulk(true)}>
              Xóa đã chọn ({selected.size})
            </Button>
          </Col>
        )}
      </Row>

      {loading && <div className="text-center py-4"><Spinner animation="border" /></div>}
      {error && <Alert variant="danger">Lỗi: {error}</Alert>}

      {!loading && (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th style={{ width: 40 }} className="text-center">
                <Form.Check
                  checked={posts.length > 0 && selected.size === posts.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th style={{ width: 60 }}>#</th>
              <th>Tiêu đề</th>
              <th style={{ width: 90 }}>Tác giả</th>
              <th style={{ width: 170 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id}>
                <td className="text-center">
                  <Form.Check
                    checked={selected.has(p.id)}
                    onChange={() => toggleSelect(p.id)}
                  />
                </td>
                <td><Badge bg="secondary">#{p.id}</Badge></td>
                <td>
                  <Link to={`/posts/${p.id}`} className="text-decoration-none fw-semibold">
                    {p.title}
                  </Link>
                </td>
                <td className="text-center">User {p.userId}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="me-2"
                    onClick={() => navigate(`/posts/${p.id}/edit`)}
                  >
                    Sửa
                  </Button>
                  {/* NC5: Mở modal xác nhận thay vì window.confirm */}
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => setConfirmId(p.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} className="text-center text-muted py-3">Không có bài viết nào</td></tr>
            )}
          </tbody>
        </Table>
      )}

      {/* NC6: Phân trang qua useSearchParams */}
      <Pagination className="justify-content-center flex-wrap">
        <Pagination.Prev
          disabled={page <= 1}
          onClick={() => setSearchParams({ page: page - 1, userId, ...(keyword ? { q: keyword } : {}) })}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <Pagination.Item
            key={n}
            active={n === page}
            onClick={() => setSearchParams({ page: n, userId, ...(keyword ? { q: keyword } : {}) })}
          >
            {n}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={page >= totalPages}
          onClick={() => setSearchParams({ page: page + 1, userId, ...(keyword ? { q: keyword } : {}) })}
        />
      </Pagination>
      <p className="text-center text-muted small">
        Tổng: {total} bài viết – Trang {page}/{totalPages}
      </p>

      {/* NC5: Modal xác nhận xóa đơn */}
      <Modal show={confirmId !== null} onHide={() => setConfirmId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa bài viết <strong>#{confirmId}</strong>?
          <br />
          <small className="text-muted">(NC10.2: Optimistic update – Xóa ngay khỏi UI, khôi phục nếu server báo lỗi)</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmId(null)}>Hủy</Button>
          <Button variant="danger" onClick={handleConfirmSingleDelete}>Xóa bài viết</Button>
        </Modal.Footer>
      </Modal>

      {/* NC5 + NC10.1: Modal xóa hàng loạt */}
      <Modal show={confirmBulk} onHide={() => setConfirmBulk(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xóa hàng loạt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn xóa <strong>{selected.size}</strong> bài viết đã chọn?
          <br />
          <small className="text-muted">(NC10.1: Gửi đồng thời bằng Promise.allSettled)</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmBulk(false)}>Hủy</Button>
          <Button variant="danger" onClick={handleBulkDelete}>Xác nhận xóa tất cả</Button>
        </Modal.Footer>
      </Modal>

      {/* NC5: Toast thông báo kết quả */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={toast.show}
          onClose={() => setToast(t => ({ ...t, show: false }))}
          delay={3500}
          autohide
          bg={toast.variant}
        >
          <Toast.Body className="text-white fw-bold">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default PostsPage;
