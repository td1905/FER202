import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { toggleTodo, deleteTodo, editTodo } from '../../redux/bai2/actions';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const save = () => {
    if (text.trim()) dispatch(editTodo(todo.id, text.trim()));
    setEditing(false);
  };

  return (
    <ListGroup.Item className="d-flex align-items-center gap-2">
      <Form.Check
        type="checkbox"
        checked={todo.done}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />

      {editing ? (
        <Form.Control
          size="sm"
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === 'Enter' && save()}
        />
      ) : (
        <span
          className="flex-grow-1"
          style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
          onDoubleClick={() => setEditing(true)}
          title="Double-click để sửa"
        >
          {todo.text}
        </span>
      )}

      <Button size="sm" variant="outline-danger" onClick={() => dispatch(deleteTodo(todo.id))}>
        Xóa
      </Button>
    </ListGroup.Item>
  );
}
