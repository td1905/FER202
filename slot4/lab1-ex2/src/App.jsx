import ProductList from "./ProductList";
function App() {
  const pizzaData = [
    { id: 1, name: 'Pizza Hải Sản', price: 150000, avatar: '/anh1.jpg' },
    { id: 2, name: 'Pizza Bò Phô Mai', price: 180000, avatar: '/anh2.jpg' },
    { id: 3, name: 'Pizza Gà Nấm', price: 160000, avatar: '/anh3.jpg' }
  ];

  return <ProductList products={pizzaData} />;
}

export default App;