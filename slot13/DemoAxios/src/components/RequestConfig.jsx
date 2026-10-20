// src/components/RequestConfig.jsx – NC1 (async/await) + NC5 (bootstrap) + NC2 (axiosClient)
import React, { useState, useEffect } from 'react';
import { Spinner, Alert, ListGroup, Badge } from 'react-bootstrap';
import axiosClient from '../api/axiosClient';

const RequestConfig = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  // NC1: async/await thay .then/.catch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // NC2: dùng axiosClient thay URL đầy đủ
        const res = await axiosClient({
          method: 'get',
          url: '/posts',
          params: { _page: 1, _limit: 3 },
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer demo-token-123',
          },
          timeout: 5000,
        });
        setInfo({
          status: res.status,
          contentType: res.headers['content-type'],
          total: res.headers['x-total-count'],
          data: res.data,
        });
      } catch (err) {
        if (err.code === 'ECONNABORTED') setError('Request quá thời gian (timeout)');
        else if (err.response) setError(`Server trả lỗi ${err.response.status}`);
        else setError(err.message);
      }
    };
    fetchData();
  }, []);

  if (error) return <Alert variant="danger">Lỗi: {error}</Alert>;
  if (!info) return <Spinner animation="border" />;

  return (
    <div>
      <h2>Cấu hình request <Badge bg="info" style={{ fontSize: '0.6em' }}>NC1+NC2+NC5</Badge></h2>
      <p>Status: <Badge bg="success">{info.status}</Badge></p>
      <p>Content-Type: <code>{info.contentType}</code></p>
      <p>x-total-count: <strong>{info.total}</strong></p>
      <ListGroup>
        {info.data.map(p => (
          <ListGroup.Item key={p.id}>
            <Badge bg="secondary" className="me-2">#{p.id}</Badge>{p.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default RequestConfig;
