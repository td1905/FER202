import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductInfo from './ProductInfo';

function App() {
  const pizzaList = [
    {
      id: 1,
      name: "Pizza Hải Sản",
      price: 150000,
      avatar: "/anh1.jpg"
    },
    {
      id: 2,
      name: "Pizza Bò Phô Mai",
      price: 180000,
      avatar: "/anh2.jpg"
    }
  ];

  return (
    <Container className="py-4">
      <h1 className="mb-4">Danh sách Pizza</h1>
      <Row className="g-4">
        {pizzaList.map((item) => (
          <Col xs={12} key={item.id}>
            <ProductInfo product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;