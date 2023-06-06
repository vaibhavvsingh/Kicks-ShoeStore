import React from 'react'
import { Link } from 'react-router-dom'

function Dropdown() {
  return (
    <div className='fixed bg-white p-4 text-xs flex flex-col gap-5 z-10 h-full'>
        <div><Link to='/'>SHOP</Link></div>
        <hr />
        <div><Link to='/login'>SIGN IN/JOIN</Link></div>
        <hr />
        <div>ABOUT US</div>
        <div>CONTACT</div>
        <div>SHIPPING INFORMATION</div>
        <div>RETURN AND EXCHANGE</div>
        <div>LEGAL</div>
        <div>CAREERS</div>
        <hr />
        <div>SIGN UP FOR OUR NEWSLETTER</div>
        <div>FOLLOW US ON:</div>
        <div>FB IG WA</div>
    </div>
  )
}

export default Dropdown