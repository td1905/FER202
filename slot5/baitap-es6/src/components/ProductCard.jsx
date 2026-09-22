import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const ProductCard = ({ product = {} }) => {
  // ES6: Destructuring có default parameter
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
    inStock = false,
    discount = 0,
  } = product;

  // ES6: Nullish coalescing ?? và Optional chaining ?.
  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
  const categoryName = category?.name ?? 'Chưa phân loại';
  const ratingRate = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;

  // ES6: Tính giá sau giảm
  const finalPrice = price !== undefined ? price * (1 - discount / 100) : 0;

  const formattedOriginalPrice = price !== undefined && price !== null
    ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    : 'Liên hệ';

  const formattedFinalPrice = finalPrice.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    // ES6: Template literals ghép class có điều kiện (opacity-50 khi hết hàng)
    <Card className={`h-100 position-relative shadow-sm ${inStock ? '' : 'opacity-50'}`}>
      {/* ES6: Bẫy số 0 -> dùng discount > 0 && */}
      {discount > 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          -{discount}%
        </Badge>
      )}

      <Card.Img variant="top" src={imageSrc} style={{ height: 180, objectFit: 'cover' }} />

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge bg="info" text="dark">{categoryName}</Badge>
          {/* ES6: rating >= 4.5 hiện Bán chạy */}
          {rating?.rate >= 4.5 && <Badge bg="warning" text="dark">Bán chạy</Badge>}
        </div>

        <Card.Title className="fs-6">{name}</Card.Title>

        <div className="mb-2">
          {/* ES6: Toán tử 3 ngôi hiển thị giá có giảm hay không */}
          {discount > 0 && price !== undefined ? (
            <div>
              <span className="text-danger fw-bold me-2">{formattedFinalPrice}</span>
              <del className="text-muted small">{formattedOriginalPrice}</del>
            </div>
          ) : (
            <span className="fw-bold text-primary">{formattedOriginalPrice}</span>
          )}
        </div>

        <Card.Text className="small text-muted mb-3">
          Đánh giá: ⭐ {ratingRate} ({ratingCount} lượt)
        </Card.Text>

        <div className="mt-auto">
          <div className="mb-2">
            {/* ES6: Toán tử 3 ngôi trạng thái kho */}
            {inStock ? (
              <Badge bg="success">Còn hàng</Badge>
            ) : (
              <Badge bg="secondary">Hết hàng</Badge>
            )}
          </div>

          {/* ES6: Nút bấm disabled khi !inStock */}
          <Button variant="primary" className="w-100" disabled={!inStock}>
            {inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;