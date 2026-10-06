import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoginForm from './components/LoginForm';

// Component con nằm BÊN TRONG Provider để có thể gọi useAuth()
const HomeContent = () => {
  const { isLoggedIn, user, login } = useAuth();

  return isLoggedIn ? (
    <div className="alert alert-success">
      <h5>Đăng nhập thành công!</h5>
      <p className="mb-0">
        {`Bạn đang đăng nhập bằng tài khoản: ${user.email}. Hãy bấm nút Tối/Sáng trên Header để kiểm tra theme toàn trang.`}
      </p>
    </div>
  ) : (
    <div>
      <p className="text-muted text-center mb-3">Vui lòng đăng nhập để tiếp tục:</p>
      <LoginForm onLoginSuccess={login} />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <Layout title="Bài 9: Theme & Auth với useContext">
        <HomeContent />
      </Layout>
    </AuthProvider>
  </ThemeProvider>
);

export default App;