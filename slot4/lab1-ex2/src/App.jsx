// src/App.jsx
import ProductList from './components/ProductList';
import { pizzaData } from './data/pizzaData'; // <-- Import dữ liệu từ file data

function App() {
  return (
    <div>
      <ProductList products={pizzaData} />
    </div>
  );
}

export default App;