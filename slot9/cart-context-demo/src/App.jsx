import { CartProvider } from "./contexts/CartContext";
import CartBadge from "./components/CartBadge";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

export default function App() {
  return (
    <CartProvider>
      <div className="container">
        <header className="navbar">
          <h2>FER202 Shop Demo</h2>
          <CartBadge />
        </header>

        <main>
          <ProductList />
          <hr style={{ margin: "32px 0", border: "0", borderTop: "1px solid #ddd" }} />
          <Cart />
        </main>
      </div>
    </CartProvider>
  );
}