// src/usestate/StudentManager.jsx
import { useState } from 'react';
import { Container, Card, Form, Button, Table, Badge, Row, Col } from 'react-bootstrap';

const CITIES = ['Hà Nội', 'Đà Nẵng', 'TP.HCM', 'Cần Thơ'];

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, contact: { city: 'Hà Nội' } },
  { id: 2, name: 'Trần Thị Bình', score: 4.5, contact: { city: 'Đà Nẵng' } },
  { id: 3, name: 'Lê Minh Châu', score: 6.0, contact: { city: 'TP.HCM' } },
];

export default function StudentManager() {
  const [students, setStudents] = useState(initialStudents);
  const [newName, setNewName] = useState('');
  const [sortBy, setSortBy] = useState('none');

  const addStudent = (e) => {
    e.preventDefault();
    if (newName.trim().length < 3) return;

    const newStudent = {
      id: Date.now(),
      name: newName.trim(),
      score: 0,
      contact: { city: CITIES[0] },
    };

    setStudents((prev) => [...prev, newStudent]);
    setNewName('');
  };

  const updateScore = (id, value) => {
    const num = Math.min(10, Math.max(0, Number(value) || 0));
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: num } : s))
    );
  };

  const updateCity = (id, city) => {
    // Cập nhật bất biến 2 cấp (shallow copy từng tầng)
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, contact: { ...s.contact, city } } : s
      )
    );
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const bonusAll = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        score: Math.min(10, +(s.score + 0.5).toFixed(1)),
      }))
    );
  };

  // Dữ liệu dẫn xuất (sắp xếp trên bản sao mảng, không đụng vào state gốc)
  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name, 'vi');
    if (sortBy === 'score') return b.score - a.score;
    return 0;
  });

  const total = students.length;
  const passedCount = students.filter((s) => s.score >= 5).length;
  const average = total === 0
    ? '0.00'
    : (students.reduce((acc, s) => acc + s.score, 0) / total).toFixed(2);

  return (
    <Container className="my-4">
      <h4 className="mb-3">Bài 4: Quản lý điểm sinh viên</h4>

      {/* Form thêm & lọc */}
      <Card className="mb-3">
        <Card.Body>
          <Row className="g-2 align-items-center">
            <Col md={5}>
              <Form onSubmit={addStudent} className="d-flex gap-2">
                <Form.Control
                  placeholder="Tên sinh viên (≥ 3 ký tự)..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <Button type="submit" variant="primary" disabled={newName.trim().length < 3}>
                  Thêm
                </Button>
              </Form>
            </Col>
            <Col md={4}>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="none">Thứ tự nhập</option>
                <option value="name">Theo tên A → Z</option>
                <option value="score">Điểm cao → thấp</option>
              </Form.Select>
            </Col>
            <Col md={3} className="text-end">
              <Button variant="success" onClick={bonusAll} disabled={total === 0}>
                +0.5 cả lớp
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Bảng sinh viên */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ và tên</th>
            <th style={{ width: '120px' }}>Điểm</th>
            <th>Thành phố</th>
            <th>Kết quả</th>
            <th style={{ width: '80px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                Danh sách trống.
              </td>
            </tr>
          ) : (
            sortedStudents.map((s, idx) => (
              <tr key={s.id}>
                <td>{idx + 1}</td>
                <td>{s.name}</td>
                <td>
                  <Form.Control
                    type="number"
                    size="sm"
                    step="0.5"
                    min="0"
                    max="10"
                    value={s.score}
                    onChange={(e) => updateScore(s.id, e.target.value)}
                  />
                </td>
                <td>
                  <Form.Select
                    size="sm"
                    value={s.contact.city}
                    onChange={(e) => updateCity(s.id, e.target.value)}
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Badge bg={s.score >= 5 ? 'success' : 'danger'}>
                    {s.score >= 5 ? 'Đạt' : 'Chưa đạt'}
                  </Badge>
                </td>
                <td>
                  <Button variant="outline-danger" size="sm" onClick={() => removeStudent(s.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Card.Footer className="text-muted fw-bold">
        Sĩ số: {total} · Điểm trung bình: {average} · Đạt: {passedCount}/{total}
      </Card.Footer>
    </Container>
  );
}