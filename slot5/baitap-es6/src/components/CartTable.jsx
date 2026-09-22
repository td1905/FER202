import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import { cartItems } from '../data/cart';
import { products } from '../data/product';

// Hàm format tiền tệ VND
const formatVND = (n) =>
  n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const CartTable = () => {
  // 1. Sắp xếp thành tiền giảm dần (dùng [...cartItems] để không làm thay đổi mảng gốc)
  const sortedItems = [...cartItems].sort(
    (a, b) => b.price * b.quantity - a.price * a.quantity
  );

  // 2. Tính tổng tiền & tổng số lượng bằng reduce
  const totalPrice = cartItems.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );
  const totalQuantity = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);

  // 3. Đơn giá cao nhất bằng Math.max kết hợp map & spread
  const maxPrice = Math.max(...cartItems.map((item) => item.price));

  // 4. Lọc sản phẩm đang giảm giá và còn hàng (filter)
  const onSale = products.filter(({ inStock, discount }) => inStock && discount > 0);

  return (
    <div>
      <h4 className="mb-3">Bảng giỏ hàng</h4>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th className="text-center">STT</th>
            <th>Tên sản phẩm</th>
            <th className="text-end">Đơn giá</th>
            <th className="text-center">Số lượng</th>
            <th className="text-end">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {/* Destructuring ngay trong tham số của map, index + 1 làm STT */}
          {sortedItems.map(({ id, name, price, quantity }, index) => (
            <tr key={id}>
              <td className="text-center">{index + 1}</td>
              <td>{name}</td>
              <td className="text-end">{formatVND(price)}</td>
              <td className="text-center">{quantity}</td>
              <td className="text-end fw-semibold">{formatVND(price * quantity)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="fw-bold">Tổng số lượng</td>
            <td colSpan={2} className="text-end fw-bold">{totalQuantity}</td>
          </tr>
          <tr>
            <td colSpan={3} className="fw-bold">Đơn giá cao nhất</td>
            <td colSpan={2} className="text-end fw-bold text-primary">{formatVND(maxPrice)}</td>
          </tr>
          <tr className="table-success">
            <td colSpan={3} className="fw-bold text-uppercase">Tổng tiền thanh toán</td>
            <td colSpan={2} className="text-end fw-bold fs-5 text-danger">{formatVND(totalPrice)}</td>
          </tr>
        </tfoot>
      </Table>

      {/* Danh sách sản phẩm đang giảm giá và còn hàng */}
      <h5 className="mt-4 mb-3">Sản phẩm đang giảm giá và còn hàng</h5>
      <ListGroup className="shadow-sm">
        {onSale.map(({ id, name, price, discount }) => (
          <ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
            <div>
              <span className="me-2">{name}</span>
              <Badge bg="danger">{`-${discount}%`}</Badge>
            </div>
            <span className="fw-bold text-danger">
              {formatVND(price * (1 - discount / 100))}
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CartTable;