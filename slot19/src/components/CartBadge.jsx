import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { selectCartCount } from '../features/cart/cartSlice';

export default function CartBadge() {
  const count = useSelector(selectCartCount);
  return (
    <span className="fs-5">
      🛒 <Badge bg="danger" pill>{count}</Badge>
    </span>
  );
}
