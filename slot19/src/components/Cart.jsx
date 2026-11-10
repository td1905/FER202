import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import {
  selectCartItems,
  selectCartTotal,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';

const vnd = (n) => n.toLocaleString('vi-VN') + ' ₫';

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0) return <p className="text-muted">Giỏ hàng trống.</p>;

  return (
    <>
      <Table size="sm" bordered hover responsive>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th className="text-center">SL</th>
            <th className="text-end">Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td className="text-center">
                <ButtonGroup size="sm">
                  <Button variant="outline-secondary" onClick={() => dispatch(decreaseQty(i.id))}>
                    -
                  </Button>
                  <Button variant="light" disabled>
                    {i.quantity}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    disabled={i.quantity >= i.stock}
                    onClick={() => dispatch(increaseQty(i.id))}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </td>
              <td className="text-end">{vnd(i.price * i.quantity)}</td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant="link"
                  className="text-danger"
                  onClick={() => dispatch(removeFromCart(i.id))}
                >
                  ✕
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Tổng cộng</th>
            <th className="text-end text-danger">{vnd(total)}</th>
            <th></th>
          </tr>
        </tfoot>
      </Table>
      <Button variant="outline-danger" size="sm" onClick={() => dispatch(clearCart())}>
        Xóa giỏ hàng
      </Button>
    </>
  );
}
