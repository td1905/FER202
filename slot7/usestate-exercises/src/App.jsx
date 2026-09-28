import { Container } from 'react-bootstrap';
import Counter from './components/Counter';
import ControlledInput from './components/ControlledInput';

function App() {
  return (
    <Container className="py-5 text-center">
      {/* Bài 1 */}
      <div className="mb-5">
        <h5 className="mb-3 fw-bold text-secondary">1. Counter Component</h5>
        <Counter />
      </div>

      {/* Bài 2 */}
      <div className="mb-5">
        <h5 className="mb-3 fw-bold text-secondary">2. Controlled Input Field</h5>
        <ControlledInput />
      </div>
    </Container>
  );
}

export default App;