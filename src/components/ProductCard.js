import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="w-[100%] p-4 sm:w-[50%] lg:w-[300px]">
      <Link to={`/product/${product.id}`}>
        <img src={product.img} alt="product" />
        <p>{product.brand.toUpperCase()}</p>
        <p className="font-semibold">{product.name}</p>
        <p>Rs. {product.price}.00</p>
      </Link>
    </div>
  );
}

export default ProductCard;
