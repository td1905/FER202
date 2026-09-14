function ProductInfo({ product }) {
  const { name, price, tags } = product;

  return (
    <div>
      <h3>{name}</h3>
      <p>Giá: {price} VNĐ</p>
      <p>
        Thẻ: {tags.map((tag, index) => (
          <span key={index}>#{tag} </span>
        ))}
      </p>
    </div>
  );
}

export default ProductInfo;