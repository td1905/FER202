import { useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ProductList from '../components/ProductList';
import CartSummary from '../components/CartSummary';
import { products } from '../data/products';
import {
  cartReducer,
  initialCart,
  CART_ACTIONS,
  getCartTotals,
} from '../reducers/cartReducer';

const CartDemoPage = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const { totalQuantity } = getCartTotals(cart);

  const handleAddToCart = (product) =>
    dispatch({ type: CART_ACTIONS.ADD, payload: product });

  return (
    <Row className="g-4">
      <Col lg={7}>
        <h5 className="mb-3">Danh sách sản phẩm</h5>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </Col>
      <Col lg={5}>
        <h5 className="mb-3">
          Giỏ hàng <Badge bg="primary">{totalQuantity}</Badge>
        </h5>
        <CartSummary cart={cart} dispatch={dispatch} />
      </Col>
    </Row>
  );
};

export default CartDemoPage;