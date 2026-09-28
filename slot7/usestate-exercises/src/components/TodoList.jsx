import { useState } from 'react';
import { Form, Button, Card, ListGroup, Row, Col } from 'react-bootstrap';

function TodoList() {
  const [todos, setTodos] = useState(['Học lập trình .NET', 'Học lập trình Java']);
  const [task, setTask] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos((prev) => [...prev, task.trim()]);
    setTask('');
  };

  const handleDelete = (indexToDelete) => {
    setTodos((prev) => prev.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <div
      className="p-4 mx-auto rounded shadow"
      style={{
        backgroundColor: '#282c34',
        maxWidth: '850px',
        color: '#ffffff',
      }}
    >
      <Row className="align-items-start g-4">
        {/* Form nhập Task */}
        <Col md={7}>
          <Form onSubmit={handleAddTodo} className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Please input a Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="rounded-1"
            />
            <Button
              type="submit"
              variant="danger"
              className="text-nowrap px-3"
              style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
            >
              Add Todo
            </Button>
          </Form>
        </Col>

        {/* Bảng danh sách Todo */}
        <Col md={5}>
          <Card className="text-dark border-0 shadow-sm rounded-3">
            <Card.Body className="p-3">
              <Card.Title className="text-center fw-bold mb-3 fs-5">
                Todo List
              </Card.Title>
              <ListGroup variant="flush">
                {todos.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center px-2 py-2 border-bottom"
                  >
                    <span className="text-dark fw-medium">{item}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      className="px-2 py-1 fs-7"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
                {todos.length === 0 && (
                  <div className="text-center text-muted py-2 small">
                    Chưa có công việc nào!
                  </div>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TodoList;