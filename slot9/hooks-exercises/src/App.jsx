import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';

const App = () => (
  <div className="container my-4">
    <h5>Phần 1. Bộ chọn số lượng</h5>
    <div className="d-flex flex-column gap-3 mb-4">
      <QuantityPicker />
      <QuantityPicker min={2} max={5} />
    </div>

    <h5>Phần 2. Giỏ hàng mini</h5>
    <MiniCart />
  </div>
);

export default App;