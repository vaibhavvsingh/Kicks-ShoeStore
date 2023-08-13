import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";

function Bag() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userid = useSelector((state) => state.user.userid);
  const items = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function removeCartItem(id) {
    const response = await fetch("http://localhost:3500/cart", {
      method: "delete",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid,
        id,
      }),
    });
    const data = await response.json();
    toast(data.message, { position: toast.POSITION.BOTTOM_CENTER });
    if (response.status === 200) {
      dispatch(removeFromCart(id));
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  if (!items || !items.length) {
    return <div className="text-center mt-4 text-2xl">BAG IS EMPTY!</div>;
  }
  return (
    <div className="flex flex-col items-center mt-6 mx-4">
      <ToastContainer />
      <h1 className="text-2xl">BAG</h1>
      {items?.map((item, index) => (
        <div
          key={index}
          className="relative flex h-48 w-[100%] sm:w-[80%] md:w-[60%] lg:w-[40%] justify-center items-center rounded-lg my-2 mx-4 shadow-md"
          // style={{border:"1px solid black"}}
        >
          <div className="w-[50%] flex justify-center mx-4">
            <img className="h-44 object-contain" src={item.img} alt="" />
          </div>
          <div className="w-[50%]">
            <div>{item.name}</div>
            <div>{item.brand}</div>
            <div>Rs. {item.price}.00</div>
            <div>Quantity: {item.quantity}</div>
          </div>
          <div
            className="absolute top-[-10px] right-[-10px] rounded-full text-center bg-red-500 hover:bg-red-700 cursor-pointer w-[25px] h-[25px] text-white"
            onClick={() => {
              removeCartItem(item.id);
            }}
          >
            X
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bag;
