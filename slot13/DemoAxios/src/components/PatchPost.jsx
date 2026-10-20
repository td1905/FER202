// src/components/PatchPost.jsx – NC1 (async/await) + NC5 (bootstrap InputGroup)
import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup, Badge } from 'react-bootstrap';
import postApi from '../api/postApi';

const PatchPost = () => {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // NC1: async/await trong event handler
  const handlePatch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await postApi.patch(1, { title }); // chỉ gửi 1 trường
      setResult({ status: res.status, data: res.data });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>
        PATCH – Sửa tiêu đề bài viết #1{' '}
        <Badge bg="info" style={{ fontSize: '0.6em' }}>NC1+NC5</Badge>
      </h2>

      {/* NC5: InputGroup */}
      <InputGroup className="mb-2" style={{ maxWidth: 500 }}>
        <Form.Control
          placeholder="Tiêu đề mới"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Button
          onClick={handlePatch}
          disabled={!title.trim() || loading}
          variant="warning"
        >
          {loading ? 'Đang gửi...' : 'Cập nhật (PATCH)'}
        </Button>
      </InputGroup>

      {error && <Alert variant="danger">Lỗi: {error}</Alert>}
      {result && (
        <Alert variant="success">
          <Alert.Heading>Status: {result.status}</Alert.Heading>
          <pre className="mb-0">{JSON.stringify(result.data, null, 2)}</pre>
        </Alert>
      )}
    </div>
  );
};

export default PatchPost;
