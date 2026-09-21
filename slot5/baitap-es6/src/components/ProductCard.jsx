import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const ProductCard = ({ product = {} }) => {
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
  } = product;

  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
  const categoryName = category?.name ?? 'Chưa phân loại';
  const ratingRate = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;

  const formattedPrice = price !== undefined && price !== null
    ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    : 'Liên hệ';

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imageSrc} style={{ height: 180, objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge bg="info" text="dark">{categoryName}</Badge>
        </div>
        <Card.Title className="fs-6">{name}</Card.Title>
        <Card.Text className="fw-bold text-primary mb-1">
          {formattedPrice}
        </Card.Text>
        <Card.Text className="small text-muted mt-auto">
          Đánh giá: ⭐ {ratingRate} ({ratingCount} lượt)
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;