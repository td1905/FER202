import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { increment, decrement, incrementByAmount, reset, double } from '../redux/counterActions';

export default function Counter() {
  const count = useSelector((state) => state.counter.value); // đọc state từ Redux store
  const dispatch = useDispatch(); // lấy hàm dispatch
  const [step, setStep] = useState(2); // state cục bộ cho input số bước

  return (
    <Card className="mx-auto mt-5 text-center shadow" style={{ maxWidth: 450 }}>
      <Card.Header as="h4" className="bg-primary text-white">
        Redux Counter (Bài 1)
      </Card.Header>
      <Card.Body>
        <h1 className="display-3 fw-bold my-2">{count}</h1>
        <Badge bg={count % 2 === 0 ? 'success' : 'warning'} className="mb-3 fs-6">
          {count % 2 === 0 ? 'Số chẵn' : 'Số lẻ'}
        </Badge>

        <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
          <Button variant="danger" onClick={() => dispatch(decrement())}>
            -
          </Button>
          <Button variant="success" onClick={() => dispatch(increment())}>
            +
          </Button>
          <Button variant="primary" onClick={() => dispatch(incrementByAmount(5))}>
            +5
          </Button>
          <Button variant="info" className="text-white" onClick={() => dispatch(double())}>
            x2
          </Button>
          <Button variant="secondary" onClick={() => dispatch(reset())}>
            Reset
          </Button>
        </div>

        <InputGroup className="mt-2">
          <Form.Control
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            placeholder="Nhập số bước..."
          />
          <Button variant="dark" onClick={() => dispatch(incrementByAmount(step))}>
            Cộng {step}
          </Button>
        </InputGroup>
      </Card.Body>
      <Card.Footer className="text-muted small">
        State được quản lý tập trung trong Redux Store
      </Card.Footer>
    </Card>
  );
}
