import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Account() {
  const user = useSelector((state=>state.user))
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user.isLoggedIn){
      navigate('/login')
    }
    // eslint-disable-next-line
  },[])

  return (
    <div className='text-2xl m-5'>Hey, {user.email}!</div>
  )
}

export default Account