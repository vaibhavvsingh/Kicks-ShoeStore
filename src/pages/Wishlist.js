import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../store/wishlistSlice";

function Wishlist() {
  const items = useSelector((state) => state.wishlist);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function removeWishlistItem(id) {
    dispatch(removeFromWishlist(id));
  }
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  if (!items || !items.length) {
    return <div className="text-center mt-4 text-2xl">WISHLIST IS EMPTY!</div>;
  }
  return (
    <div className="flex flex-col items-center mt-6 mx-4">
      <h1>WISHLIST</h1>
      {items?.map((item, index) => (
        <div
          key={index}
          className="relative flex h-48 w-[100%] sm:w-[80%] md:w-[60%] lg:w-[40%] justify-center items-center rounded-lg my-2 shadow-md"
          // style={{border:"1px solid black"}}
        >
          <div className="w-[50%] flex justify-center mx-4">
            <img className="h-44 object-contain" src={item.img} alt="" />
          </div>
          <div className="">
            <div>{item.name}</div>
            <div>{item.brand}</div>
            <div>Rs. {item.price}.00</div>
          </div>
          <div
            className="absolute top-[-10px] right-[-10px] rounded-full text-center bg-red-500 hover:bg-red-700 cursor-pointer w-[25px] h-[25px] text-white"
            onClick={() => {
              removeWishlistItem(item.id);
            }}
          >
            X
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
