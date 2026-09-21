import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProductCard from './ProductCard';

const ProductList = ({ products = [] }) => {
  // ES6: Lấy danh sách danh mục không trùng lặp bằng Set và spread (...)
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category?.name).filter(Boolean))];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* ES6: Template literals */}
        <h5 className="mb-0">{`Có ${products.length} sản phẩm`}</h5>
        <div className="d-flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <Button key={cat} variant="outline-primary" size="sm">
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid đáp ứng: 1 cột mobile (xs), 2 cột tablet (md), 4 cột desktop (lg) */}
      <Row xs={1} md={2} lg={4} className="g-4">
        {products.map((product) => (
          // ES6: key duy nhất đặt ở thẻ ngoài cùng (Col)
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;