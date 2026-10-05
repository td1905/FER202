import { useCart, useCartDispatch } from "../contexts/CartContext";

export default function Cart() {
  const { items } = useCart();
  const dispatch = useCartDispatch();

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (items.length === 0) {
    return (
      <section>
        <h2>Chi tiết giỏ hàng</h2>
        <p>Giỏ hàng hiện đang trống.</p>
      </section>
    );
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Chi tiết giỏ hàng</h2>
        <button className="danger" onClick={() => dispatch({ type: "CLEAR" })}>
          Xoá toàn bộ
        </button>
      </div>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString("vi-VN")} đ</td>
              <td>
                <button onClick={() => dispatch({ type: "DECREASE", payload: item.id })}>
                  -
                </button>
                <span style={{ margin: "0 10px", fontWeight: "bold" }}>{item.qty}</span>
                <button onClick={() => dispatch({ type: "ADD", payload: item })}>
                  +
                </button>
              </td>
              <td>{(item.price * item.qty).toLocaleString("vi-VN")} đ</td>
              <td>
                <button
                  className="danger"
                  onClick={() => dispatch({ type: "REMOVE", payload: item.id })}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: "16px", color: "#d63384" }}>
        Tổng tiền: {totalAmount.toLocaleString("vi-VN")} đ
      </h3>
    </section>
  );
}