import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { addTodo } from '../../redux/bai2/actions';

export default function TodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text.trim()));
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          placeholder="Nhập công việc..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="primary" type="submit" disabled={!text.trim()}>
          Thêm
        </Button>
      </InputGroup>
    </Form>
  );
}
