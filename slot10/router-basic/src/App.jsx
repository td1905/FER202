import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';

const STUDENTS = [
  { id: 'SE160001', name: 'Phạm Minh Anh', className: 'SE20B01', gpa: 8.5 },
  { id: 'SE160002', name: 'Trần Bình Minh', className: 'SE20B02', gpa: 7.9 },
  { id: 'SE160003', name: 'Võ Thanh Dũng', className: 'SE20B01', gpa: 6.8 },
  { id: 'SE160004', name: 'Đỗ Ngọc Hân', className: 'SE20B04', gpa: 9.1 },
  { id: 'SE160005', name: 'Nguyễn Quốc Cường', className: 'SE20B02', gpa: 8.0 },
  { id: 'SE160006', name: 'Lê Hoàng Nam', className: 'SE20B04', gpa: 7.4 },
];

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const selectedClass = searchParams.get('class') ?? '';

  const updateParam = (key, value, replace = false) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value.trim()) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        return next;
      },
      { replace }
    );
  };

  const filteredStudents = STUDENTS.filter((s) => {
    const keyword = q.toLowerCase().trim();
    const matchKeyword =
      !keyword ||
      s.name.toLowerCase().includes(keyword) ||
      s.id.toLowerCase().includes(keyword);

    const matchClass = !selectedClass || s.className === selectedClass;

    return matchKeyword && matchClass;
  });

  return (
    <Container className="p-4 border rounded bg-white mt-3">
      <h3 className="mb-4">Danh bạ sinh viên</h3>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm theo tên hoặc MSSV..."
            value={q}
            onChange={(e) => updateParam('q', e.target.value, true)}
          />
        </Col>

        <Col md={4}>
          <Form.Select
            value={selectedClass}
            onChange={(e) => updateParam('class', e.target.value, false)}
          >
            <option value="">-- Tất cả lớp --</option>
            <option value="SE20B01">SE20B01</option>
            <option value="SE20B02">SE20B02</option>
            <option value="SE20B04">SE20B04</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => setSearchParams({})}
          >
            Xóa lọc
          </Button>
        </Col>
      </Row>

      <p className="text-muted">
        Tìm thấy <strong>{filteredStudents.length}</strong>/{STUDENTS.length} sinh viên.
      </p>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>MSSV</th>
            <th>Họ và tên</th>
            <th>Lớp</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.className}</td>
                <td>{s.gpa.toFixed(1)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-muted py-3">
                Không có sinh viên phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}