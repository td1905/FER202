// src/usestate/BmiCalculator.jsx
import { useState } from 'react';
import { Container, Card, Form, ButtonGroup, Button, Alert } from 'react-bootstrap';

function classify(bmi) {
  if (bmi < 18.5) return { label: 'Thiếu cân', variant: 'info' };
  if (bmi < 23) return { label: 'Bình thường', variant: 'success' };
  if (bmi < 25) return { label: 'Thừa cân', variant: 'warning' };
  return { label: 'Béo phì', variant: 'danger' };
}

export default function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('cm'); // 'cm' | 'm'

  // Chuyển kiểu và kiểm tra hợp lệ
  const hNum = Number(height);
  const wNum = Number(weight);

  const errors = {};
  if (height !== '') {
    const isHeightValid = unit === 'cm'
      ? hNum >= 50 && hNum <= 250
      : hNum >= 0.5 && hNum <= 2.5;
    if (!isHeightValid) {
      errors.height = unit === 'cm' ? 'Chiều cao từ 50 đến 250 cm' : 'Chiều cao từ 0.5 đến 2.5 m';
    }
  }

  if (weight !== '') {
    if (!(wNum >= 10 && wNum <= 300)) {
      errors.weight = 'Cân nặng từ 10 đến 300 kg';
    }
  }

  // Dữ liệu dẫn xuất
  const isReady = height !== '' && weight !== '' && !errors.height && !errors.weight;
  let bmi = null;
  let result = null;

  if (isReady) {
    const heightInMeter = unit === 'cm' ? hNum / 100 : hNum;
    bmi = (wNum / (heightInMeter * heightInMeter)).toFixed(1);
    result = classify(Number(bmi));
  }

  const changeUnit = (nextUnit) => {
    if (nextUnit === unit) return;
    if (height !== '' && !isNaN(hNum)) {
      if (nextUnit === 'm') {
        setHeight((hNum / 100).toString());
      } else {
        setHeight(Math.round(hNum * 100).toString());
      }
    }
    setUnit(nextUnit);
  };

  return (
    <Container className="my-4" style={{ maxWidth: '500px' }}>
      <Card>
        <Card.Header as="h4">Bài 3: Máy tính BMI (Chuẩn Châu Á)</Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <Form.Label className="fw-semibold mb-0">Chiều cao ({unit}):</Form.Label>
              <ButtonGroup size="sm">
                <Button
                  variant={unit === 'cm' ? 'primary' : 'outline-primary'}
                  onClick={() => changeUnit('cm')}
                >
                  cm
                </Button>
                <Button
                  variant={unit === 'm' ? 'primary' : 'outline-primary'}
                  onClick={() => changeUnit('m')}
                >
                  m
                </Button>
              </ButtonGroup>
            </div>
            <Form.Control
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              isInvalid={!!errors.height}
              placeholder={unit === 'cm' ? 'VD: 170' : 'VD: 1.7'}
            />
            <Form.Control.Feedback type="invalid">{errors.height}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Cân nặng (kg):</Form.Label>
            <Form.Control
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              isInvalid={!!errors.weight}
              placeholder="VD: 65"
            />
            <Form.Control.Feedback type="invalid">{errors.weight}</Form.Control.Feedback>
          </Form.Group>

          {result ? (
            <Alert variant={result.variant} className="mb-0 text-center">
              <strong>BMI = {bmi}</strong> → {result.label}
            </Alert>
          ) : (
            <Alert variant="light" className="mb-0 text-center text-muted border">
              Vui lòng nhập đầy đủ chiều cao và cân nặng hợp lệ để tính kết quả.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}