import { products } from "../data/products";
import { useCartDispatch } from "../contexts/CartContext";

export default function ProductList() {
  const dispatch = useCartDispatch();

  return (
    <section>
      <h2>Danh sách sản phẩm</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <div>
              <h4>{p.name}</h4>
              <p className="price">{p.price.toLocaleString("vi-VN")} đ</p>
            </div>
            <button
              className="primary"
              onClick={() => dispatch({ type: "ADD", payload: p })}
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}