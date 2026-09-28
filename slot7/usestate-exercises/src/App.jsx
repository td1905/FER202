import { Container } from 'react-bootstrap';
import Counter from './components/Counter';

function App() {
  return (
    <Container className="py-5 text-center">
      <h5 className="mb-4 fw-bold text-secondary">1. Counter Component</h5>
      <Counter />
    </Container>
  );
}

export default App;