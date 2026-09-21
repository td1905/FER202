import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const StudentCard = ({ student }) => {
  const {
    id,
    name,
    major,
    gpa,
    avatar,
    contact: { email: studentEmail, phone },
  } = student;

  return (
    <Card style={{ width: '18rem' }} className="shadow-sm">
      <Card.Img variant="top" src={avatar} alt={name} style={{ height: 200, objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{id} - {major}</Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item><strong>GPA:</strong> {gpa}</ListGroup.Item>
        <ListGroup.Item><strong>Email:</strong> {studentEmail}</ListGroup.Item>
        <ListGroup.Item><strong>SĐT:</strong> {phone}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="primary" className="w-100">Xem hồ sơ</Button>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;