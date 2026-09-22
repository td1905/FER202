import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProductCard from './ProductCard';

const ProductList = ({ products = [] }) => {
  // Lấy danh mục không trùng bằng Set và spread
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category?.name).filter(Boolean))];

  return (
    <div>
      {/* Thanh tiêu đề và nút lọc danh mục */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">{`Có ${products.length} sản phẩm`}</h5>
        <div className="d-flex gap-1">
          {categories.map((cat) => (
            <Button key={cat} variant="outline-primary" size="sm">
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Lưới 4 cột theo đúng yêu cầu đề bài */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;