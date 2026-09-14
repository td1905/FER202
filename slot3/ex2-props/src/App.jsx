import ProductInfo from "./ProductInfo";

function App() {
  const pizzaList = [
    {
      id: 1,
      name: "Pizza Hải Sản",
      price: 150000,
      tags: ["haisan", "cay"],
      avatar: "/anh1.jpg"
    },
    {
      id: 2,
      name: "Pizza Bò Phô Mai",
      price: 180000,
      tags: ["bo", "phomai"],
      avatar: "/anh2.jpg"
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh sách Pizza</h1>
      <div style={{ display: "flex" }}>
        {pizzaList.map((item) => (
          <ProductInfo key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default App;