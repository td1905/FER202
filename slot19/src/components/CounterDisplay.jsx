import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

export default function CounterDisplay() {
  // Lấy trực tiếp từ Redux store mà không cần props từ Counter
  const count = useSelector((state) => state.counter.value);

  return (
    <Card className="mx-auto mt-3 text-center border-info" style={{ maxWidth: 450 }}>
      <Card.Body className="py-2">
        <small className="text-secondary d-block">Component độc lập (Không nhận props):</small>
        <strong>Giá trị hiện tại lấy từ Redux Store: {count}</strong>
      </Card.Body>
    </Card>
  );
}
