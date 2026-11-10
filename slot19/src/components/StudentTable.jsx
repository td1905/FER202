import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import {
  fetchStudents,
  deleteStudent,
  clearError,
  selectVisibleStudents,
  selectStudentsState,
} from '../features/students/studentsSlice';

export default function StudentTable({ onEdit }) {
  const students = useSelector(selectVisibleStudents);
  const { status, error, saving } = useSelector(selectStudentsState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const handleDelete = async (s) => {
    if (!window.confirm(`Xóa sinh viên ${s.name}?`)) return;
    try {
      await dispatch(deleteStudent(s.id)).unwrap();
    } catch {
      /* lỗi đã được lưu vào state.error bởi addMatcher */
    }
  };

  if (status === 'loading') return <div className="text-center p-5"><Spinner /></div>;

  if (status === 'failed')
    return (
      <Alert variant="danger">
        Không tải được dữ liệu: {error}. Bạn đã chạy <code>npm start</code> (hoặc <code>npm run server</code>) chưa?{' '}
        <Button size="sm" onClick={() => dispatch(fetchStudents())}>
          Thử lại
        </Button>
      </Alert>
    );

  return (
    <>
      {error && (
        <Alert variant="warning" dismissible onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th className="text-center">GPA</th>
            <th>Ngành</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                Không có dữ liệu
              </td>
            </tr>
          )}
          {students.map((s, i) => (
            <tr key={s.id}>
              <td>{i + 1}</td>
              <td>{s.code}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td className="text-center">
                <Badge bg={s.gpa >= 8 ? 'success' : s.gpa >= 5 ? 'primary' : 'danger'}>
                  {s.gpa}
                </Badge>
              </td>
              <td>{s.major}</td>
              <td className="text-center text-nowrap">
                <Button size="sm" variant="warning" className="me-1" onClick={() => onEdit(s)}>
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={saving}
                  onClick={() => handleDelete(s)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
