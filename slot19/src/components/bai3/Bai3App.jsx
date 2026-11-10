import { Container, Row, Col } from 'react-bootstrap';
import UserList from './UserList';
import UserPosts from './UserPosts';

export default function Bai3App() {
  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center">👥 Bài 3: Danh sách User với Redux Thunk & Axios</h3>
      <Row>
        <Col md={5} className="mb-3 mb-md-0">
          <UserList />
        </Col>
        <Col md={7}>
          <UserPosts />
        </Col>
      </Row>
    </Container>
  );
}
