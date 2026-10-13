import { Routes, Route, NavLink, Outlet, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Table } from 'react-bootstrap';

const MainLayout = () => (
  <div className="border rounded bg-light p-3">
    <Navbar bg="primary" variant="dark" className="px-3 rounded mb-3">
      <Navbar.Brand>Thư viện FPT</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/" end>Trang chủ</Nav.Link>
        <Nav.Link as={NavLink} to="/books">Sách</Nav.Link>
        <Nav.Link as={NavLink} to="/help">Hướng dẫn</Nav.Link>
      </Nav>
    </Navbar>

    <Container as="main" className="bg-white p-4 rounded border min-vh-50">
      <Outlet />
    </Container>

    <footer className="text-center text-muted py-3 mt-3 border-top small">
      © 2026 Thư viện FPT University. All rights reserved.
    </footer>
  </div>
);

const HomePage = () => (
  <div>
    <h3>Chào mừng đến với Thư viện số FPT</h3>
    <p>Hệ thống hỗ trợ tra cứu tài liệu và quy chế mượn trả sách dành cho sinh viên.</p>
  </div>
);

const BooksPage = () => {
  const books = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008 },
    { id: 2, title: 'Design Patterns', author: 'Erich Gamma et al.', year: 1994 },
    { id: 3, title: 'You Don\'t Know JS', author: 'Kyle Simpson', year: 2015 },
  ];

  return (
    <div>
      <h4>Danh mục sách tham khảo</h4>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Năm xuất bản</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const HelpLayout = () => (
  <div>
    <h4>Trung tâm trợ giúp & Hướng dẫn</h4>
    <Nav variant="tabs" className="my-3">
      <Nav.Link as={NavLink} to="faq">Câu hỏi thường gặp</Nav.Link>
      <Nav.Link as={NavLink} to="rules">Nội quy</Nav.Link>
    </Nav>
    <div className="pt-2">
      <Outlet />
    </div>
  </div>
);

const FaqPage = () => (
  <div>
    <h6>Mỗi sinh viên được mượn tối đa bao nhiêu cuốn?</h6>
    <p className="text-muted">Tối đa 3 cuốn sách chuyên ngành trong vòng 14 ngày.</p>
  </div>
);

const RulesPage = () => (
  <div>
    <h6>Nội quy phòng đọc</h6>
    <ul className="text-muted">
      <li>Giữ trật tự chung trong khuôn viên thư viện.</li>
      <li>Bảo quản tài liệu nguyên vẹn, không ghi chú lên sách.</li>
    </ul>
  </div>
);

const NotFoundPage = () => (
  <div className="text-center py-4 text-danger">
    <h5>404 - Trang không tồn tại</h5>
  </div>
);

export default function App() {
  return (
    <Container className="p-3">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="help" element={<HelpLayout />}>
            <Route index element={<Navigate to="faq" replace />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="rules" element={<RulesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Container>
  );
}