import Container from 'react-bootstrap/Container';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title = 'Trang chủ' }) => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <Container className="flex-grow-1 my-4">
      <h2 className="my-4 pb-2 border-bottom">{title}</h2>
      {children}
    </Container>
    <Footer />
  </div>
);

export default Layout;