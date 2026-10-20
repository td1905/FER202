// src/components/AxiosDemo.jsx – NC1 (async/await) + NC4 (postId input + AbortController)
import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Card, Form, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import axiosClient from '../api/axiosClient';

const AxiosDemo = () => {
  const [postId, setPostId] = useState(1);
  const [inputId, setInputId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NC4: useEffect phụ thuộc [postId], có AbortController cleanup
  useEffect(() => {
    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get(`/posts/${postId}`, {
          signal: controller.signal,
        });
        setData(res.data);
      } catch (err) {
        // NC4: bỏ qua lỗi hủy request
        if (axios.isCancel(err) || err.name === 'CanceledError') return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    // cleanup: hủy request khi postId thay đổi hoặc unmount
    return () => controller.abort();
  }, [postId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const id = Number(inputId);
    if (id >= 1 && id <= 100) setPostId(id);
  };

  return (
    <div>
      <h1>Axios Demo <Badge bg="info" style={{ fontSize: '0.6em' }}>NC1 + NC4</Badge></h1>

      {/* NC4: ô nhập Post ID */}
      <Form onSubmit={handleSearch} className="d-flex gap-2 mb-3">
        <Form.Control
          type="number"
          min={1}
          max={100}
          value={inputId}
          onChange={e => setInputId(e.target.value)}
          placeholder="Nhập Post ID (1–100)"
          style={{ maxWidth: 220 }}
        />
        <Button type="submit" variant="primary">Tìm</Button>
      </Form>

      {loading && <Spinner animation="border" role="status" />}
      {error && (
        <Alert variant="danger">
          Lỗi: {error}
        </Alert>
      )}
      {data && !loading && (
        <Card>
          <Card.Body>
            <Card.Subtitle className="text-muted mb-1">Post #{data.id} – User {data.userId}</Card.Subtitle>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.body}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default AxiosDemo;
