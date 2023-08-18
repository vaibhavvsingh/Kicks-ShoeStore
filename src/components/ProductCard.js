import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <img src={product.img} alt="product" />
      <p>{product.brand.toUpperCase()}</p>
      <p className="font-semibold">{product.name}</p>
      <p>Rs. {product.price}.00</p>
    </Link>
  );
}

export default ProductCard;
