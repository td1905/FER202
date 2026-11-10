import { Row, Col } from 'react-bootstrap';
import ProductList from '../ProductList';
import Cart from '../Cart';

export default function Bai4App() {
  return (
    <div>
      <h3 className="mb-4 text-center">
        🛒 Bài 4: Giỏ hàng với Redux Toolkit (createSlice & Immer)
      </h3>
      <Row>
        <Col lg={7}>
          <ProductList />
        </Col>
        <Col lg={5} className="mt-4 mt-lg-0">
          <div className="p-3 bg-white rounded shadow-sm border">
            <h4 className="mb-3">Giỏ hàng</h4>
            <Cart />
          </div>
        </Col>
      </Row>
    </div>
  );
}
