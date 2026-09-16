import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ProductInfo({ product }) {
  const { name, price, avatar } = product;

  return (
    <Card className="text-center h-100">
      <Card.Img 
        variant="top" 
        src={avatar} 
        style={{ height: '160px', objectFit: 'contain' }} 
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {Number(price).toLocaleString('vi-VN')} đ
        </Card.Text>
        <Button variant="primary">Buy now</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductInfo;