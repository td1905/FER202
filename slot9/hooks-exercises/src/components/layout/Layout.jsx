import Container from 'react-bootstrap/Container';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children, title = 'Trang chủ' }) => {
  const { theme } = useTheme();

  return (
    <div data-bs-theme={theme} className="bg-body text-body min-vh-100 pb-5">
      <Header />
      <Container className="py-4">
        <h2 className="mb-4">{title}</h2>
        {children}
      </Container>
    </div>
  );
};

export default Layout;