import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const MAX_BIO = 150;
const majors = ['Software Engineering', 'Artificial Intelligence', 'Digital Marketing'];

const ProfilePreview = () => {
  // Quản lý state độc lập cho từng ô
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState(majors[0]);
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');

  // Nhấn Escape để xóa trắng ô họ tên
  const handleNameKeyDown = (event) => {
    if (event.key === 'Escape') setFullName('');
  };

  // Giới hạn độ dài bio tối đa 150 ký tự
  const handleBioChange = (event) => {
    setBio(event.target.value.slice(0, MAX_BIO));
  };

  // Dữ liệu dẫn xuất: tính số ký tự còn lại
  const remaining = MAX_BIO - bio.length;

  return (
    <Row className="g-4">
      {/* Cột trái: Form nhập liệu */}
      <Col md={6}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="pp-name">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              value={fullName}
              placeholder="Chưa nhập tên"
              onChange={(e) => setFullName(e.target.value)}
              onKeyDown={handleNameKeyDown}
              onFocus={() => setFocused('fullName')}
              onBlur={() => setFocused('')}
              className={focused === 'fullName' ? 'border-primary border-2 shadow-none' : ''}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="pp-major">
            <Form.Label>Chuyên ngành</Form.Label>
            <Form.Select value={major} onChange={(e) => setMajor(e.target.value)}>
              {majors.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="pp-bio">
            <Form.Label>Giới thiệu</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={bio}
              onChange={handleBioChange}
              placeholder="Viết vài dòng giới thiệu..."
            />
            <Form.Text className={remaining < 20 ? 'text-danger' : 'text-muted'}>
              {`Còn ${remaining}/${MAX_BIO} ký tự`}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="pp-password">
            <Form.Label>Mật khẩu</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? 'Ẩn' : 'Hiện'}
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Col>

      {/* Cột phải: Card Xem trước trực tiếp */}
      <Col md={6}>
        <Card className="shadow-sm">
          <Card.Header className="fw-bold">Xem trước</Card.Header>
          <Card.Body>
            <Card.Title>{fullName.trim() || 'Chưa nhập tên'}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{major}</Card.Subtitle>
            <Card.Text>{bio || <em>Chưa có giới thiệu</em>}</Card.Text>
            <small className="text-muted d-block mt-3">
              {`Mật khẩu: ${password.length} ký tự`}
            </small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfilePreview;