import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InputField from './InputField';
import AppButton from './AppButton';
import { fields, genders, majors } from '../data/registerConfig';

const RegisterForm = () => {
  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="shadow-sm">
          <Card.Header as="h4" className="text-center bg-primary text-white py-3">
            Đăng ký tài khoản
          </Card.Header>

          <Card.Body className="p-4">
            <Form onSubmit={(event) => event.preventDefault()}>
              {/* Bước 3: Sinh các ô nhập liệu từ mảng fields qua spread props */}
              {fields.map((field) => (
                <InputField key={field.id} {...field} />
              ))}

              {/* Bước 4: Sinh radio giới tính qua map + template literal cho id */}
              <Form.Group className="mb-3">
                <Form.Label className="d-block fw-semibold">Giới tính</Form.Label>
                {genders.map((gender) => (
                  <Form.Check
                    inline
                    key={gender}
                    type="radio"
                    name="gender"
                    id={`gender-${gender}`}
                    label={gender}
                    defaultChecked={gender === 'Nam'}
                  />
                ))}
              </Form.Group>

              {/* Bước 5: Sinh ô chọn chuyên ngành */}
              <Form.Group className="mb-3" controlId="majorSelect">
                <Form.Label className="fw-semibold">Chuyên ngành</Form.Label>
                <Form.Select defaultValue="">
                  <option value="" disabled>-- Chọn chuyên ngành --</option>
                  {majors.map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Bước 6: Checkbox điều khoản và Nút submit */}
              <Form.Group className="mb-4" controlId="agreeTerms">
                <Form.Check
                  type="checkbox"
                  label="Tôi đồng ý với điều khoản sử dụng"
                  required
                />
              </Form.Group>

              <AppButton type="submit" className="w-100" size="lg">
                Đăng ký
              </AppButton>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;