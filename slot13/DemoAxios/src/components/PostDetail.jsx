// src/components/PostDetail.jsx – NC3: Nhiều request cùng lúc + đo thời gian + Promise.allSettled
import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner, Alert, Badge, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import postApi from '../api/postApi';

const PostDetail = ({ postId = 1 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [benchmark, setBenchmark] = useState(null);
  const [benchmarking, setBenchmarking] = useState(false);

  // NC3.1 & NC3.3: Lấy bài viết, sau đó lấy song song tác giả và bình luận bằng Promise.allSettled
  useEffect(() => {
    const controller = new AbortController();

    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        // Bước 1: lấy bài viết (cần post.userId trước)
        const postRes = await postApi.getById(postId, controller.signal);
        const post = postRes.data;

        // NC3.3: Dùng Promise.allSettled để nếu phần bình luận lỗi thì vẫn hiển thị bài viết và tác giả
        const [userResult, commentsResult] = await Promise.allSettled([
          postApi.getUserById(post.userId, controller.signal),
          postApi.getComments(postId, controller.signal),
        ]);

        setData({
          post,
          user: userResult.status === 'fulfilled' ? userResult.value.data : null,
          userError: userResult.status === 'rejected' ? userResult.reason.message : null,
          comments: commentsResult.status === 'fulfilled' ? commentsResult.value.data : [],
          commentsError: commentsResult.status === 'rejected' ? commentsResult.reason.message : null,
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
  }, [postId]);

  // NC3.2: Đo và so sánh thời gian khi gọi Tuần tự vs Song song (Promise.all)
  const runBenchmark = async () => {
    if (!data?.post) return;
    setBenchmarking(true);
    const userId = data.post.userId;

    try {
      // 1. Gọi TUẦN TỰ: user xong mới gọi comments
      const t0Seq = performance.now();
      await postApi.getUserById(userId);
      await postApi.getComments(postId);
      const seqDuration = Math.round(performance.now() - t0Seq);

      // 2. Gọi SONG SONG bằng Promise.all
      const t0Par = performance.now();
      await Promise.all([
        postApi.getUserById(userId),
        postApi.getComments(postId),
      ]);
      const parDuration = Math.round(performance.now() - t0Par);

      setBenchmark({
        sequential: seqDuration,
        parallel: parDuration,
        diff: seqDuration - parDuration,
        percent: Math.round(((seqDuration - parDuration) / (seqDuration || 1)) * 100),
      });
    } catch (err) {
      console.error('Benchmark lỗi:', err);
    } finally {
      setBenchmarking(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Lỗi: {error}</Alert>;
  if (!data) return null;

  return (
    <div>
      <h2>
        NC3 – Chi tiết bài viết (Nhiều request cùng lúc){' '}
        <Badge bg="info" style={{ fontSize: '0.6em' }}>NC3</Badge>
      </h2>

      {/* NC3.2: Nút đo và so sánh thời gian */}
      <Card className="mb-3 border-info">
        <Card.Header className="bg-info-subtle d-flex justify-content-between align-items-center">
          <strong>⏱ NC3.2: Đo & so sánh thời gian Tuần tự vs Song song</strong>
          <Button
            size="sm"
            variant="primary"
            onClick={runBenchmark}
            disabled={benchmarking}
          >
            {benchmarking ? <Spinner size="sm" /> : 'Chạy đo benchmark'}
          </Button>
        </Card.Header>
        <Card.Body>
          {benchmark ? (
            <Table bordered size="sm" className="mb-0 text-center">
              <thead>
                <tr>
                  <th>Cách gọi</th>
                  <th>Cơ chế</th>
                  <th>Thời gian (ms)</th>
                  <th>Đánh giá</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Tuần tự</strong></td>
                  <td><code>await user; await comments;</code></td>
                  <td className="text-danger fw-bold">{benchmark.sequential} ms</td>
                  <td>Chậm hơn (chờ từng request)</td>
                </tr>
                <tr>
                  <td><strong>Song song</strong></td>
                  <td><code>Promise.all([user, comments])</code></td>
                  <td className="text-success fw-bold">{benchmark.parallel} ms</td>
                  <td>
                    Nhanh hơn <strong>{benchmark.diff} ms</strong> ({benchmark.percent}%)
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p className="mb-0 text-muted small">
              Nhấn nút <em>"Chạy đo benchmark"</em> để thực tế đo thời gian giữa gọi tuần tự (chờ xong user mới gọi comments) và gọi song song (Promise.all).
            </p>
          )}
        </Card.Body>
      </Card>

      {/* Chi tiết bài viết */}
      <Card className="mb-3">
        <Card.Body>
          <Badge bg="secondary" className="mb-1">Post #{data.post.id}</Badge>
          <Card.Title>{data.post.title}</Card.Title>
          <Card.Text>{data.post.body}</Card.Text>
        </Card.Body>
      </Card>

      {/* Tác giả (từ Promise.allSettled) */}
      {data.userError && (
        <Alert variant="warning">Không tải được tác giả: {data.userError}</Alert>
      )}
      {data.user && (
        <p>
          <strong>Tác giả:</strong> {data.user.name}{' '}
          <small className="text-muted">({data.user.email})</small>
        </p>
      )}

      {/* Bình luận (từ Promise.allSettled - nếu lỗi thì bài viết và tác giả vẫn hiển thị) */}
      {data.commentsError && (
        <Alert variant="warning">Không tải được bình luận: {data.commentsError}</Alert>
      )}
      {data.comments.length > 0 && (
        <>
          <h6>Bình luận ({data.comments.length}):</h6>
          <ListGroup>
            {data.comments.slice(0, 3).map(c => (
              <ListGroup.Item key={c.id}>
                <strong>{c.name}</strong>
                <p className="mb-0 text-muted small">{c.body}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default PostDetail;
