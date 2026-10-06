import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';

const App = () => (
  <div className="container my-4">
    <h3 className="mb-4 text-primary">Lab 4: Exercises Hooks</h3>

    <section className="mb-5">
      <h4>Bài 1. Bộ chọn số lượng & Giỏ hàng mini</h4>
      <div className="d-flex flex-column gap-3 mb-3">
        <QuantityPicker />
      </div>
      <MiniCart />
    </section>

    <hr />

    <section className="mb-5">
      <h4>Bài 2. Hồ sơ xem trước trực tiếp</h4>
      <ProfilePreview />
    </section>
  </div>
);

export default App;