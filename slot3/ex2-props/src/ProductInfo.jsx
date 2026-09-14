function ProductInfo({ product }) {
  const { name, price, tags, avatar } = product;

  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "5px",
        width: "200px",
        padding: "10px",
        margin: "10px"
      }}
    >
      <img
        src={avatar}
        alt={name}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover"
        }}
      />
      <h3>{name}</h3>
      <p>Giá: {price} VNĐ</p>
      <p>
        Tags:{" "}
        {tags.map((tag, index) => (
          <span key={index}>#{tag} </span>
        ))}
      </p>
    </div>
  );
}

export default ProductInfo;