import { useSelector } from 'react-redux';
import { Card, Spinner, Alert } from 'react-bootstrap';

export default function UserPosts() {
  const usersState = useSelector((state) => state.users) || {};
  const {
    selectedId = null,
    posts = [],
    postsLoading = false,
    postsError = null,
    items = [],
  } = usersState;
  const user = items.find((u) => u.id === selectedId);

  if (!selectedId)
    return (
      <div className="alert alert-light border text-muted p-4 text-center">
        ← Chọn một user bên trái để xem danh sách bài viết
      </div>
    );

  if (postsLoading)
    return (
      <div className="text-center p-4">
        <Spinner animation="border" size="sm" /> Đang tải bài viết...
      </div>
    );

  if (postsError) return <Alert variant="danger">{postsError}</Alert>;

  return (
    <div>
      <h5 className="mb-3">
        Bài viết của <span className="text-primary">{user?.name}</span> ({posts.length})
      </h5>
      {posts.map((p) => (
        <Card key={p.id} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title className="fs-6 text-capitalize fw-bold text-dark">{p.title}</Card.Title>
            <Card.Text className="small text-secondary">{p.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
