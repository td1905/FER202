import { useCart } from "../contexts/CartContext";

export default function CartBadge() {
  const { items } = useCart();
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="badge">
      🛒 Giỏ hàng ({totalCount})
    </div>
  );
}