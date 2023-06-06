import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Bag() {
  const isLoggedIn = useSelector((state=>state.user.isLoggedIn))
  const items = useSelector((state=>state.cart))
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/login')
    }
    // eslint-disable-next-line
  },[])

  if(!items || !items.length){
    return (
      <div className='text-center mt-4 text-2xl'>BAG IS EMPTY!</div>
    )
  }
  return (
    <div className='flex flex-col items-center mt-6'>
      <h1 className='text-2xl'>BAG</h1>
      {items?.map((item, index)=>(
        <div key={index} className='flex h-48 w-[40%] items-center rounded-lg m-1 shadow-md' 
        // style={{border:"1px solid black"}}
        >
          <div className='mx-4'><img className='h-44' src={item.image} alt="" /></div>
          <div className=''>
            <div>{item.name}</div>
            <div>{item.brand}</div>
            <div>Rs. {item.currentPrice}.00</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Bag