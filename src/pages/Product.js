import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { data } from '../mock/products'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice'
import { addToWishlist } from '../store/wishlistSlice'

function Product() {
  const params = useParams();
  // console.log(params)
  const product=data?.hydratedProducts[params.id-1];
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn)
  const navigate = useNavigate();
  
  function addToCartHandler(){
    if(isLoggedIn)
      dispatch(addToCart(product));
    else
      navigate('/login')
  }
  function addToWishlistHandler(){
    if(isLoggedIn)
      dispatch(addToWishlist(product));
    else
      navigate('/login')
  }

  return (
    <div className='flex pt-6'>
      <div className='w-[60%]'>
        <img className='m-auto' src={product?.image} alt="" />
      </div>
      <div className='w-[40%]'>
        <p className='text-4xl font-bold'>{product?.name}</p>
        <p className='text-2xl'>{product?.brand}</p>
        <p className='text-2xl font-semibold'>Rs. {product?.currentPrice}</p>
        <p className='text-2xl'>
          Sizes: <br />
        </p>
        <p className='flex flex-wrap'>
          {product?.skuData?.map((item)=>(
            <span key={item?.size} className='bg-slate-300 rounded-sm text-center p-4 mr-2 my-2 w-[15%]'>{item?.size}</span>
          ))}
        </p>
        <div>
          <button className='mt-5 p-4 bg-slate-500 rounded-sm text-white mr-5' onClick={addToCartHandler}>Add to Cart</button>
          <button className='mt-5 p-4 bg-slate-500 rounded-sm text-white' onClick={addToWishlistHandler}>Add to Wishlist</button>
        </div>
      </div>
    </div>
  )
}

export default Product