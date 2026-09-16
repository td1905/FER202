import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ProductInfo({ product }) {
  const { name, price= [], avatar } = product;

  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="shadow-sm">
      <Card.Img
        variant="top"
        src={avatar}
        alt={name}
        style={{ 
          height: '200px', 
          objectFit: 'contain',  
          backgroundColor: '#f8f9fa' 
        }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>

        <Card.Text className="fs-10 mb-2">
          Giá: {Number(price).toLocaleString('vi-VN')} VNĐ
        </Card.Text>

        <Button variant="primary" className="w-100">
          Buy now
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductInfo;