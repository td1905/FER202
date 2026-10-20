// src/components/PostList.jsx – NC1 + NC2 + NC9 (debounce) + NC10 (bulk + optimistic)
import React, { useState, useEffect, useCallback } from 'react';
import {
  Spinner, Alert, ListGroup, Form, Button, Badge, InputGroup,
} from 'react-bootstrap';
import axios from 'axios';
import postApi from '../api/postApi';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');           // NC9
  const [selected, setSelected] = useState(new Set()); // NC10
  const [bulkMsg, setBulkMsg] = useState('');

  // NC1 + NC9: debounce 500ms trước khi gọi API
  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { userId: 1, _limit: 10 };
        if (keyword.trim()) params.q = keyword.trim();
        const res = await postApi.getAll(params, controller.signal);
        setPosts(res.data);
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'CanceledError') return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // NC9: delay 500ms sau khi ngừng gõ
    const timer = setTimeout(fetchPosts, keyword ? 500 : 0);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [keyword]);

  // NC10: optimistic delete đơn
  const handleDelete = useCallback(async (id) => {
    const backup = [...posts];
    setPosts(prev => prev.filter(p => p.id !== id)); // xóa ngay khỏi UI
    try {
      await postApi.remove(id);
    } catch {
      setPosts(backup); // rollback nếu lỗi
    }
  }, [posts]);

  // NC10: bulk delete bằng Promise.allSettled
  const handleBulkDelete = async () => {
    const ids = [...selected];
    const results = await Promise.allSettled(ids.map(id => postApi.remove(id)));
    const ok = results.filter(r => r.status === 'fulfilled').length;
    setPosts(prev => prev.filter(p => !selected.has(p.id)));
    setSelected(new Set());
    setBulkMsg(`Xóa thành công ${ok}/${ids.length} bài viết`);
  };

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(
      selected.size === posts.length ? new Set() : new Set(posts.map(p => p.id))
    );
  };

  return (
    <div>
      <h2>
        GET – Danh sách bài viết{' '}
        <Badge bg="info" style={{ fontSize: '0.6em' }}>NC1+NC2+NC9+NC10</Badge>
      </h2>

      {/* NC9: ô tìm kiếm debounce */}
      <InputGroup className="mb-2" style={{ maxWidth: 400 }}>
        <InputGroup.Text>🔍</InputGroup.Text>
        <Form.Control
          placeholder="Tìm kiếm (gọi API sau 500ms)..."
          value={keyword}
          onChange={e => { setKeyword(e.target.value); setBulkMsg(''); }}
        />
        {keyword && (
          <Button variant="outline-secondary" onClick={() => setKeyword('')}>✕</Button>
        )}
      </InputGroup>

      {/* NC10: bulk actions */}
      {selected.size > 0 && (
        <div className="mb-2 d-flex gap-2 align-items-center">
          <Badge bg="secondary">{selected.size} đã chọn</Badge>
          <Button size="sm" variant="danger" onClick={handleBulkDelete}>
            Xóa đã chọn (Promise.allSettled)
          </Button>
        </div>
      )}
      {bulkMsg && <Alert variant="info" dismissible onClose={() => setBulkMsg('')}>{bulkMsg}</Alert>}

      {loading && <Spinner animation="border" size="sm" className="mb-2" />}
      {error && (
        <Alert variant="danger">
          Lỗi: {error}
        </Alert>
      )}

      <ListGroup>
        <ListGroup.Item className="bg-light">
          <Form.Check
            label={<strong>Chọn tất cả</strong>}
            checked={posts.length > 0 && selected.size === posts.length}
            onChange={toggleAll}
          />
        </ListGroup.Item>
        {posts.map(post => (
          <ListGroup.Item key={post.id} className="d-flex align-items-center gap-2">
            <Form.Check
              checked={selected.has(post.id)}
              onChange={() => toggleSelect(post.id)}
            />
            <span className="flex-grow-1">
              <Badge bg="secondary" className="me-1">#{post.id}</Badge>
              {post.title}
            </span>
            {/* NC10: optimistic delete */}
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => handleDelete(post.id)}
            >
              Xóa
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default PostList;
