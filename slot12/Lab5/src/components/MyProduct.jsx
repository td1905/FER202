import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const MyProduct = ({ product, onAddToCart }) => {
  const {
    id,
    name,
    description,
    price,
    discount = 0,
    instock = false,
    rating = 5.0,
    category = 'Khác',
    image,
    reviews = 50,
  } = product;

  // Format currency in Vietnamese Dong (e.g. 590.000 đ)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  // Calculate discounted price if applicable
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? Math.round(price * (1 - discount / 100)) : price;

  // Category badge color mapping
  const getCategoryBadgeBg = (cat) => {
    switch (cat) {
      case 'Âm thanh':
        return 'info';
      case 'Phụ kiện':
        return 'info';
      case 'Màn hình':
        return 'info';
      case 'Lưu trữ':
        return 'info';
      default:
        return 'primary';
    }
  };

  return (
    <Card className="h-100 border shadow-sm product-card overflow-hidden">
      {/* Product Image & Discount Ribbon */}
      <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          className="w-100 h-100 object-fit-cover product-img"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {hasDiscount && (
          <Badge
            bg="danger"
            className="position-absolute top-0 end-0 m-2 px-2 py-1 fs-6 fw-bold shadow-sm"
          >
            -{discount}%
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column p-3">
        {/* Category & Stock Status Badges */}
        <div className="d-flex gap-2 mb-2 align-items-center">
          <Badge bg={getCategoryBadgeBg(category)} className="text-white px-2 py-1">
            {category}
          </Badge>
          {instock ? (
            <Badge bg="success" className="px-2 py-1">
              Còn hàng
            </Badge>
          ) : (
            <Badge bg="secondary" className="px-2 py-1">
              Hết hàng
            </Badge>
          )}
        </div>

        {/* Product Name */}
        <Card.Title className="fw-bold text-dark fs-5 mb-1" title={name}>
          {name}
        </Card.Title>

        {/* Price & Discount Display */}
        <div className="my-2">
          {hasDiscount ? (
            <div className="d-flex align-items-baseline gap-2">
              <span className="text-decoration-line-through text-muted small">
                {formatCurrency(price)}
              </span>
              <span className="text-danger fw-bold fs-5">
                {formatCurrency(finalPrice)}
              </span>
            </div>
          ) : (
            <div className="fw-bold fs-5 text-dark">
              {formatCurrency(price)}
            </div>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="text-muted small mb-3">
          Đánh giá: <strong>{rating}</strong> ({reviews} lượt)
        </div>

        {/* Action Button: Thêm vào giỏ nếu còn hàng, Không khả dụng nếu hết hàng */}
        <div className="mt-auto">
          {instock ? (
            <Button
              variant="primary"
              className="w-100 py-2 fw-semibold"
              onClick={() => onAddToCart && onAddToCart(product)}
            >
              <i className="bi bi-cart-plus me-1"></i> Thêm vào giỏ
            </Button>
          ) : (
            <Button
              variant="light"
              className="w-100 py-2 text-muted border"
              disabled
              style={{ backgroundColor: '#e2e8f0' }}
            >
              Không khả dụng
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MyProduct;
