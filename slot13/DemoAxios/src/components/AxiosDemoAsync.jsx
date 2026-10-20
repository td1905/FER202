// src/components/AxiosDemoAsync.jsx – NC1 (async/await) + NC8 (custom hook useAxios)
import React, { useCallback } from 'react';
import { Spinner, Alert, Button, Card, Badge } from 'react-bootstrap';
import useAxios from '../hooks/useAxios';
import postApi from '../api/postApi';

const AxiosDemoAsync = () => {
  // NC8: Áp dụng custom hook useAxios cho component chỉ có GET
  const fetcher = useCallback((signal) => postApi.getAll({ _limit: 5 }, signal), []);
  const { data: posts, loading, error, refetch } = useAxios(fetcher, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="h5 mb-0">
          Demo Custom Hook <code>useAxios</code>{' '}
          <Badge bg="success">NC8</Badge>
        </h3>
        <Button size="sm" variant="outline-primary" onClick={refetch} disabled={loading}>
          🔄 Tải lại (refetch)
        </Button>
      </div>

      {loading && (
        <div className="text-center py-3">
          <Spinner animation="border" size="sm" className="me-2" />
          <span>Đang tải danh sách qua <code>useAxios</code>...</span>
        </div>
      )}

      {/* NC8: Thêm nút Thử lại gọi refetch() khi có lỗi */}
      {error && (
        <Alert variant="danger" className="d-flex justify-content-between align-items-center">
          <span>Lỗi: {error}</span>
          <Button size="sm" variant="danger" onClick={refetch}>
            Thử lại
          </Button>
        </Alert>
      )}

      {posts && !loading && (
        <div className="d-flex flex-column gap-2">
          {posts.map(p => (
            <Card key={p.id} className="p-2 border-start border-primary border-3">
              <div className="fw-bold">
                <Badge bg="secondary" className="me-1">#{p.id}</Badge>
                {p.title}
              </div>
              <small className="text-muted text-truncate">{p.body}</small>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AxiosDemoAsync;