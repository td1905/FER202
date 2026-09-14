import ProductInfo from "./ProductInfo";

function App() {
  const productList = [
    {
      id: 1,
      name: "Laptop Dell Inspiron",
      price: 18000000,
      tags: ["Laptop", "Dell", "Văn phòng"]
    },
    {
      id: 2,
      name: "Bàn phím DareU",
      price: 650000,
      tags: ["Phím cơ", "Gaming"]
    },
    {
      id: 3,
      name: "Chuột Logitech",
      price: 450000,
      tags: ["Chuột", "Không dây"]
    }
  ];

  return (
    <div>
      <h2>Thông tin sản phẩm</h2>
      {productList.map((item) => (
        <ProductInfo key={item.id} product={item} />
      ))}
    </div>
  );
}

export default App;