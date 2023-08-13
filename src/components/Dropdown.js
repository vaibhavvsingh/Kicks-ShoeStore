import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../static/constants";
import { toast } from "react-toastify";
import { logout } from "../store/userSlice";
import { clearCart } from "../store/cartSlice";
import { clearWishlist } from "../store/wishlistSlice";

function Dropdown({ dropdown }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function logoutHandle() {
    const response = await fetch(backendUrl + "user/logout", {
      credentials: "include",
    });
    const data = await response.json();
    toast.success(data.message, { position: toast.POSITION.BOTTOM_CENTER });
    dispatch(logout());
    localStorage.removeItem("user");
    dispatch(clearCart());
    dispatch(clearWishlist());
    navigate("/");
  }
  return (
    <div
      className={
        "fixed bg-white p-4 text-xs flex flex-col gap-5 z-10 md:h-full shadow-md md:w-[250px] transition-all " +
        (!dropdown && "translate-x-[-250px]")
      }
    >
      <div>
        <Link to="/">SHOP</Link>
      </div>
      <hr />
      <div>
        {!isLoggedIn ? (
          <Link to="/login">SIGN IN/JOIN</Link>
        ) : (
          <p onClick={logoutHandle}></p>
        )}
      </div>
      <hr />
      <div>
        <Link to="/wishlist">WISHLIST</Link>
      </div>
      <div>
        <Link to="/account">ACCOUNT</Link>
      </div>
      <div>
        <Link to="/bag">BAG</Link>
      </div>
    </div>
  );
}

export default Dropdown;
