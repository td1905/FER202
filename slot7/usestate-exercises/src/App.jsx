import { Container } from 'react-bootstrap';
import Counter from './components/Counter';
import ControlledInput from './components/ControlledInput';
import ToggleVisibility from './components/ToggleVisibility';
import TodoList from './components/TodoList';

function App() {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fw-bold text-dark">React useState Exercises - Slot 7</h2>

      {/* Bài 1 */}
      <div className="mb-5 text-center">
        <h5 className="mb-3 fw-bold text-secondary">1. Counter Component</h5>
        <Counter />
      </div>

      {/* Bài 2 */}
      <div className="mb-5 text-center">
        <h5 className="mb-3 fw-bold text-secondary">2. Controlled Input Field</h5>
        <ControlledInput />
      </div>

      {/* Bài 3 */}
      <div className="mb-5 text-center">
        <h5 className="mb-3 fw-bold text-secondary">3. Toggle Visibility</h5>
        <ToggleVisibility />
      </div>

      {/* Bài 4 */}
      <div className="mb-5">
        <h5 className="mb-3 fw-bold text-secondary text-center">4. Todo List</h5>
        <TodoList />
      </div>
    </Container>
  );
}

export default App;