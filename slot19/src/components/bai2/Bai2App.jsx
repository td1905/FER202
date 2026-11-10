import { Container, Card } from 'react-bootstrap';
import TodoForm from './TodoForm';
import FilterBar from './FilterBar';
import TodoList from './TodoList';

export default function Bai2App() {
  return (
    <Container className="py-4" style={{ maxWidth: 650 }}>
      <Card className="shadow">
        <Card.Body>
          <h3 className="mb-3 text-center">📝 Bài 2: Redux Todo List (combineReducers)</h3>
          <TodoForm />
          <FilterBar />
          <TodoList />
        </Card.Body>
      </Card>
    </Container>
  );
}
