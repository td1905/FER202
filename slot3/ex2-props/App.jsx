import Container from 'react-bootstrap/Container';
import ProductList from './components/ProductList';
import { products } from './data/products';

function App() {
  return (
    <Container className="my-4">
      <ProductList products={products} />
    </Container>
  );
}

export default App;