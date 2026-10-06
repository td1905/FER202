import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';
import ProductFilter from './components/ProductFilter';
import RegisterForm from './components/RegisterForm';
import ValidatedRegisterForm from './components/ValidatedRegisterForm';
import TodoList from './components/TodoList';
import CartDemoPage from './pages/CartDemoPage';
import LoginForm from './components/LoginForm';
import { products } from './data/products';

const App = () => (
  <div className="container my-4">
    <h3 className="mb-4 text-primary">Lab 4: Exercises Hooks</h3>

    <section className="mb-5">
      <h4>Bài 1. Bộ chọn số lượng & Giỏ hàng mini</h4>
      <QuantityPicker />
      <div className="mt-3">
        <MiniCart />
      </div>
    </section>

    <hr />

    <section className="mb-5">
      <h4>Bài 2. Hồ sơ xem trước trực tiếp</h4>
      <ProfilePreview />
    </section>

    <hr />

    <section className="mb-5">
      <h4>Bài 3. Tìm kiếm, lọc và sắp xếp sản phẩm</h4>
      <ProductFilter products={products} />
    </section>

    <hr />

    <section className="mb-5">
      <h4>Bài 4. Form đăng ký có điều khiển</h4>
      <RegisterForm />
    </section>

    <hr />

    <section className="mb-5">
      <h4>Bài 5. Form đăng ký có validation</h4>
      <ValidatedRegisterForm />
    </section>

    <hr />

    <section className="mb-5">
      <h4>Bài 6. Todo list</h4>
      <TodoList />
    </section>

    <hr />

    <section className="mb-5">
      <h4>Bài 7. Giỏ hàng với useReducer</h4>
      <CartDemoPage />
    </section>

    <hr />

    <section className="mb-5">
      <h4>Bài 8. Form đăng nhập với useReducer (Async Action)</h4>
      <LoginForm />
    </section>
  </div>
);

export default App;