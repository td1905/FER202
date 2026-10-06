import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginForm from './components/LoginForm';

const TITLES = {
  shop: 'Cửa hàng',
  cart: 'Giỏ hàng',
  checkout: 'Thanh toán',
  login: 'Đăng nhập',
};

const AppContent = () => {
  const [page, setPage] = useState('shop');
  const { login } = useAuth();

  const handleLoginSuccess = (email) => {
    login(email);
    setPage('shop'); // Đăng nhập xong tự quay về cửa hàng
  };

  return (
    <Layout title={TITLES[page]} currentPage={page} onNavigate={setPage}>
      {page === 'shop' && <ShopPage />}
      {page === 'cart' && <CartPage onNavigate={setPage} />}
      {page === 'checkout' && <CheckoutPage onNavigate={setPage} />}
      {page === 'login' && <LoginForm onLoginSuccess={handleLoginSuccess} />}
    </Layout>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;