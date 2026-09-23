import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProductCard from './ProductCard';

const ProductList = ({ products = [] }) => {
    // ES6: Lấy danh sách danh mục không trùng lặp bằng Set kết hợp Spread ...
    const categories = ['Tất cả', ...new Set(products.map((p) => p.category?.name).filter(Boolean))];

    return (
        <div className="product-list-container">
            {/* Tiêu đề dùng template literal */}
            <h3 className="mb-3">{`Có ${products.length} sản phẩm`}</h3>

            {/* Thanh danh mục */}
            <div className="d-flex gap-2 mb-4 flex-wrap">
                {categories.map((cat) => (
                    <Button key={cat} variant="outline-primary" size="sm">
                        {cat}
                    </Button>
                ))}
            </div>

            {/* Lưới đáp ứng: 1 cột (mobile), 2 cột (tablet), 4 cột (desktop) */}
            <Row xs={1} md={2} lg={4} className="g-4">
                {products.map((product) => (
                    // key duy nhất đặt ở thẻ ngoài cùng của map (Col)
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList;