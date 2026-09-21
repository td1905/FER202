import Container from 'react-bootstrap/Container';
import WelcomeCard from './components/WelcomeCard';

function App() {
  return (
    <Container className="my-4">
      <h2 className="mb-4">Bài 1: Card chào mừng</h2>
      <WelcomeCard />
    </Container>
  );
}

export default App;