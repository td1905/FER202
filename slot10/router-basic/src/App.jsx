import { Routes, Route, Link, useParams, Navigate } from 'react-router-dom';
import { Container, Table, Card, Alert, Button } from 'react-bootstrap';
import { COURSES, findCourse } from './courses';

const CourseListPage = () => (
  <div>
    <h3>Danh sách môn học</h3>
    <Table bordered hover className="mt-3">
      <thead className="table-secondary">
        <tr>
          <th>Mã môn</th>
          <th>Tên môn</th>
          <th>Tín chỉ</th>
          <th>Kỳ học</th>
        </tr>
      </thead>
      <tbody>
        {COURSES.map((c) => (
          <tr key={c.code}>
            <td>
              <Link to={`/courses/${c.code}`} className="fw-bold">{c.code}</Link>
            </td>
            <td>{c.name}</td>
            <td>{c.credits}</td>
            <td>Kỳ {c.semester}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const CourseDetailPage = () => {
  const { code } = useParams();
  const course = findCourse(code);

  if (!course) {
    return (
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Lỗi tra cứu</Alert.Heading>
        <p>Không tìm thấy môn học có mã <strong>{code}</strong>.</p>
        <hr />
        <Button as={Link} to="/courses" variant="outline-danger" size="sm">
          ← Quay lại danh sách
        </Button>
      </Alert>
    );
  }

  return (
    <Card className="mt-3 shadow-sm">
      <Card.Header as="h5" className="bg-primary text-white">
        Chi tiết môn: {course.code}
      </Card.Header>
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Kỳ học: {course.semester} | Số tín chỉ: {course.credits}
        </Card.Subtitle>
        <Card.Text className="mt-3">{course.desc}</Card.Text>
        <Button as={Link} to="/courses" variant="outline-primary">
          ← Quay lại danh sách
        </Button>
      </Card.Body>
    </Card>
  );
};

export default function App() {
  return (
    <Container className="p-4">
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/courses/:code" element={<CourseDetailPage />} />
      </Routes>
    </Container>
  );
}