import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductInfo from './ProductInfo';

function ProductList({ products }) {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Danh Sách Pizza</h2>
      <Row>
        {products.map((item) => (
          <Col md={4} className="mb-3" key={item.id}>
            <ProductInfo product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;