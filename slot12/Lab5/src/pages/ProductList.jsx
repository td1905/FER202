import React, { useState, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { products } from '../data/products';
import MyProduct from '../components/MyProduct';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [sortOption, setSortOption] = useState('default');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [toastInfo, setToastInfo] = useState({ show: false, message: '' });

  // Get unique categories list including "Tất cả"
  const categories = useMemo(() => {
    const cats = ['Tất cả', ...new Set(products.map((p) => p.category))];
    return cats;
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === 'Tất cả' || p.category === selectedCategory;
        const matchesStock = onlyInStock ? p.instock : true;

        return matchesSearch && matchesCategory && matchesStock;
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        }
        if (sortOption === 'price-desc') {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        }
        if (sortOption === 'rating-desc') {
          return b.rating - a.rating;
        }
        if (sortOption === 'discount-desc') {
          return b.discount - a.discount;
        }
        return a.id - b.id; // default
      });
  }, [searchTerm, selectedCategory, sortOption, onlyInStock]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSortOption('default');
    setOnlyInStock(false);
  };

  // Add to cart toast feedback
  const handleAddToCart = (product) => {
    setToastInfo({
      show: true,
      message: `Đã thêm "${product.name}" vào giỏ hàng thành công!`,
    });
  };

  return (
    <Container className="pb-5">
      {/* Title as in teacher's screenshot */}
      <h3 className="fw-semibold text-dark mb-4">
        Bài 3: Tìm kiếm, lọc, sắp xếp
      </h3>

      {/* Top Filter Bar */}
      <Row className="g-3 align-items-center mb-3">
        {/* Search Input */}
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Tìm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2"
          />
        </Col>

        {/* Sort Select */}
        <Col md={3}>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="py-2"
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
            <option value="rating-desc">Đánh giá cao nhất</option>
            <option value="discount-desc">Giảm giá nhiều nhất</option>
          </Form.Select>
        </Col>

        {/* Stock Toggle Switch */}
        <Col md={2} className="d-flex align-items-center">
          <Form.Check
            type="switch"
            id="stock-switch"
            label="Còn hàng"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="fw-medium text-secondary"
          />
        </Col>

        {/* Reset Filter Button */}
        <Col md={2} className="text-md-end">
          <Button
            variant="outline-secondary"
            onClick={handleResetFilters}
            className="w-100 py-2"
          >
            Xóa lọc
          </Button>
        </Col>
      </Row>

      {/* Category Pills/Buttons Row */}
      <div className="mb-3 d-flex flex-wrap gap-2">
        <ButtonGroup className="flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1"
            >
              {cat}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Product Count Display */}
      <div className="text-muted small mb-4">
        Tìm thấy {filteredProducts.length}/{products.length} sản phẩm
      </div>

      {/* Product Grid using map method */}
      {filteredProducts.length > 0 ? (
        <Row xs={1} sm={2} md={4} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <MyProduct product={product} onAddToCart={handleAddToCart} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5 bg-light rounded-3 my-4">
          <i className="bi bi-search fs-1 text-muted d-block mb-3"></i>
          <h5>Không tìm thấy sản phẩm phù hợp</h5>
          <p className="text-muted small mb-3">
            Vui lòng thử từ khóa khác hoặc thiết lập lại bộ lọc.
          </p>
          <Button variant="outline-primary" onClick={handleResetFilters}>
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Toast Notification when adding to cart */}
      <ToastContainer position="bottom-end" className="p-3 position-fixed" style={{ zIndex: 1050 }}>
        <Toast
          onClose={() => setToastInfo({ show: false, message: '' })}
          show={toastInfo.show}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <i className="bi bi-check-circle-fill text-success me-2"></i>
            <strong className="me-auto text-dark">Thông Báo Giỏ Hàng</strong>
            <small className="text-muted">Vừa xong</small>
          </Toast.Header>
          <Toast.Body className="text-white fw-medium">
            {toastInfo.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default ProductList;
