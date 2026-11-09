import { Container } from 'react-bootstrap';
import Counter from './components/Counter';
import CounterDisplay from './components/CounterDisplay';

export default function App() {
  return (
    <Container className="py-4">
      <Counter />
      <CounterDisplay />
    </Container>
  );
}
