import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputField from '../components/InputField';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatVND } from '../utils/format';

const SHIPPING_FEE = 30000;
const FREE_SHIP_FROM = 1000000;
const PAYMENT_METHODS = ['COD', 'Chuyển khoản', 'Ví điện tử'];

const validateCheckout = ({ receiver, phone, address, payment }) => {
  const errors = {};
  if (receiver.trim().length < 3) {
    errors.receiver = 'Tên người nhận ít nhất 3 ký tự';
  }
  if (!/^0\d{9}$/.test(phone.replace(/\s/g, ''))) {
    errors.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0';
  }
  if (address.trim().length < 10) {
    errors.address = 'Địa chỉ quá ngắn (ít nhất 10 ký tự)';
  }
  if (!payment) {
    errors.payment = 'Chọn phương thức thanh toán';
  }
  return errors;
};

const CheckoutPage = ({ onNavigate }) => {
  const { cart, totalPrice, totalQuantity, clearCart } = useCart();
  const { user } = useAuth();

  // Khởi tạo receiver từ tài khoản nếu đã đăng nhập
  const [values, setValues] = useState({
    receiver: user?.name ?? '',
    phone: '',
    address: '',
    payment: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState(null);

  const errors = validateCheckout(values);
  const hasErrors = Object.keys(errors).length > 0;
  // Miễn phí vận chuyển từ 1.000.000đ trở lên
  const shipping = totalPrice >= FREE_SHIP_FROM ? 0 : SHIPPING_FEE;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;

    setOrder({
      code: `DH${Date.now().toString().slice(-6)}`,
      receiver: values.receiver.trim(),
      total: totalPrice + shipping,
    });
    clearCart(); // Đặt hàng thành công thì xóa sạch giỏ
  };

  // 1. Màn hình đặt hàng thành công
  if (order) {
    return (
      <Alert variant="success" className="shadow-sm">
        <Alert.Heading>🎉 Đặt hàng thành công!</Alert.Heading>
        <p className="mb-3">
          {`Mã đơn: ${order.code} · Người nhận: ${order.receiver} · Tổng thanh toán: ${formatVND(order.total)}`}
        </p>
        <Button variant="outline-success" onClick={() => onNavigate('shop')}>
          Tiếp tục mua sắm
        </Button>
      </Alert>
    );
  }

  // 2. Màn hình giỏ hàng trống
  if (totalQuantity === 0) {
    return (
      <Alert variant="info" className="shadow-sm">
        Giỏ hàng đang trống.{' '}
        <Alert.Link href="#" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>
          Quay lại cửa hàng
        </Alert.Link>
      </Alert>
    );
  }

  const errorOf = (name) => (submitted ? errors[name] : undefined);

  // 3. Form điền thông tin + Tóm tắt đơn hàng
  return (
    <Row className="g-4">
      <Col md={7}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="mb-3">Thông tin giao hàng</Card.Title>
            <Form noValidate onSubmit={handleSubmit}>
              <InputField
                id="receiver"
                name="receiver"
                label="Người nhận"
                required
                value={values.receiver}
                onChange={handleChange}
                error={errorOf('receiver')}
              />
              <InputField
                id="phone"
                name="phone"
                label="Số điện thoại"
                type="tel"
                required
                value={values.phone}
                onChange={handleChange}
                error={errorOf('phone')}
              />
              <InputField
                id="address"
                name="address"
                label="Địa chỉ"
                as="textarea"
                rows={2}
                required
                value={values.address}
                onChange={handleChange}
                error={errorOf('address')}
              />

              <Form.Group className="mb-3">
                <Form.Label className="d-block">
                  Phương thức thanh toán <span className="text-danger">*</span>
                </Form.Label>
                {PAYMENT_METHODS.map((method, index) => (
                  <Form.Check
                    inline
                    key={method}
                    type="radio"
                    id={`payment-${index}`}
                    name="payment"
                    value={method}
                    label={method}
                    checked={values.payment === method}
                    onChange={handleChange}
                    isInvalid={Boolean(errorOf('payment'))}
                  />
                ))}
                {errorOf('payment') && (
                  <div className="text-danger small mt-1">{errorOf('payment')}</div>
                )}
              </Form.Group>

              <InputField
                id="note"
                name="note"
                label="Ghi chú"
                placeholder="Không bắt buộc"
                value={values.note}
                onChange={handleChange}
              />

              <Button type="submit" variant="success" className="w-100 mt-2">
                Đặt hàng
              </Button>
              {submitted && hasErrors && (
                <Form.Text className="text-danger d-block mt-2 text-center">
                  {`Vui lòng sửa ${Object.keys(errors).length} lỗi trước khi đặt hàng`}
                </Form.Text>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col md={5}>
        <Card className="shadow-sm">
          <Card.Header className="fw-bold">{`Đơn hàng (${totalQuantity} sản phẩm)`}</Card.Header>
          <ListGroup variant="flush">
            {cart.items.map(({ id, name, price, quantity }) => (
              <ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
                <span>{`${name} × ${quantity}`}</span>
                <span>{formatVND(price * quantity)}</span>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Phí giao hàng</span>
              <span>{shipping === 0 ? 'Miễn phí' : formatVND(shipping)}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5">
              <span>Tổng thanh toán</span>
              <span className="text-primary">{formatVND(totalPrice + shipping)}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckoutPage;