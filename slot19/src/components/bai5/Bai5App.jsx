import { useState } from 'react';
import Toolbar from '../Toolbar';
import StudentTable from '../StudentTable';
import StudentFormModal from '../StudentFormModal';

export default function Bai5App() {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);

  const openAdd = () => {
    setEditing(null);
    setShow(true);
  };

  const openEdit = (student) => {
    setEditing(student);
    setShow(true);
  };

  return (
    <div>
      <h3 className="mb-4 text-center">
        🎓 Bài 5: Quản lý Sinh viên CRUD (createAsyncThunk + json-server)
      </h3>
      <Toolbar onAdd={openAdd} />
      <StudentTable onEdit={openEdit} />
      <StudentFormModal show={show} onHide={() => setShow(false)} editing={editing} />
    </div>
  );
}
