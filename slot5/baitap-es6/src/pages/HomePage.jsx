import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

// ES6: Named import từ barrel file và data module
import { ProductList, AppButton, InputField } from '../components';
import { products } from '../data/product';
import { APP_NAME } from '../data/menu';

// ES6: Arrow function component
const HomePage = () => {
  // ES6: const/let, filter, sort, slice, spread (...)
  const onSale = products.filter(({ discount }) => discount > 0);
  const deals = [...onSale].sort((a, b) => b.discount - a.discount).slice(0, 4);
  const categories = ['Tất cả', ...new Set(products.map((p) => p.category?.name).filter(Boolean))];

  // ES6: reduce, Math.round
  const total = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const sumPrice = products.reduce((acc, cur) => acc + cur.price, 0);
  const avgPrice = total > 0 ? Math.round(sumPrice / total) : 0;

  // ES6: Object shorthand
  const stats = { total, inStockCount, avgPrice };

  // ES6: Destructuring object
  const { total: stTotal, inStockCount: stInStock, avgPrice: stAvg } = stats;

  const statCards = [
    { label: 'Tổng sản phẩm', value: `${stTotal} sản phẩm` },
    { label: 'Còn hàng', value: `${stInStock} sản phẩm` },
    { label: 'Giá trung bình', value: stAvg.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) },
  ];

  return (
    <div className="d-flex flex-column gap-5">
      {/* Khối 1: Hero (Template literals) */}
      <Card className="bg-primary text-white p-4 shadow-sm border-0 text-center">
        <Card.Body>
          <Card.Title as="h1" className="display-6 fw-bold">
            {`Chào mừng đến ${APP_NAME}`}
          </Card.Title>
          <Card.Text className="lead mb-0">
            {`Hôm nay có ${onSale.length} sản phẩm đang giảm giá.`}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Khối 2: Thống kê (Map + Destructuring) */}
      <Row className="g-3">
        {statCards.map(({ label, value }) => (
          <Col md={4} key={label}>
            <Card className="text-center shadow-sm h-100 border-0 bg-light py-2">
              <Card.Body>
                <Card.Subtitle className="text-muted mb-2">{label}</Card.Subtitle>
                <Card.Title className="fs-3 fw-bold text-primary mb-0">{value}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Khối 3: Bộ lọc (Map danh mục, Arrow function chặn reload) */}
      <Card className="p-3 bg-light border-0 shadow-sm">
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
            <Form.Control placeholder="Tìm sản phẩm..." />
            <Form.Select aria-label="Lọc theo danh mục">
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
            <AppButton type="submit">Tìm</AppButton>
          </InputGroup>
        </Form>
      </Card>

      {/* Khối 4: Đang giảm giá (4 sản phẩm giảm sâu nhất) */}
      <section>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="text-danger fw-bold mb-0">Ưu đãi giảm giá sâu nhất</h3>
          <span className="text-muted">Top 4 sản phẩm ưu đãi</span>
        </div>
        <ProductList products={deals} />
      </section>

      {/* Khối 5: Tất cả sản phẩm (Toán tử 3 ngôi kiểm tra mảng rỗng) */}
      <section>
        <h3 className="fw-bold mb-3">Tất cả sản phẩm</h3>
        {products.length === 0 ? (
          <Alert variant="info">Chưa có sản phẩm nào để hiển thị.</Alert>
        ) : (
          <ProductList products={products} />
        )}
      </section>

      {/* Khối 6: Nhận tin (Form onSubmit, InputField, AppButton) */}
      <Card className="shadow-sm border-0 bg-light">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={6}>
              <h4 className="mb-1 fw-bold">Đăng ký nhận bản tin</h4>
              <p className="text-muted mb-md-0">Nhận thông báo ưu đãi và coupon mới nhất ngay trong hộp thư.</p>
            </Col>
            <Col md={6}>
              <Form onSubmit={(e) => e.preventDefault()} className="d-flex gap-2">
                <div className="flex-grow-1">
                  <InputField
                    id="newsletterEmail"
                    type="email"
                    placeholder="Nhập email của bạn..."
                    required
                  />
                </div>
                <div>
                  <AppButton type="submit" size="md">Đăng ký</AppButton>
                </div>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

// ES6: Export default
export default HomePage;