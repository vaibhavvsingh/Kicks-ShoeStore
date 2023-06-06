import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({product}) {
  return (
    <div className='w-[25%] p-4'>
      <Link to={`/product/${product.id}`} >
        <img src={product.image} alt="product" />
        <p>NIKE</p>
        <p className='font-semibold'>{product.name.replaceAll('-',' ')}</p>
        <p>Rs. {product.currentPrice}.00</p>
      </Link>
    </div>
  )
}

export default ProductCard