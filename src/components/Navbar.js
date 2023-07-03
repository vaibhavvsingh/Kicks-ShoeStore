import React, { useState } from "react";
import {
  FaBars,
  FaSearch,
  FaStar,
  FaUser,
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";
import Dropdown from "./Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { clearCart } from "../store/cartSlice";
import { clearWishlist } from "../store/wishlistSlice";
import { changeSearch } from "../store/searchSlice";

function Navbar() {
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const cartCount = useSelector((state) => {
    return state.cart?.length;
  });
  const wishlistCount = useSelector((state) => {
    return state.wishlist?.length;
  });
  const navigate = useNavigate();
  function submitSearch(e) {
    if (e.key === "Enter") {
      navigate("/");
      dispatch(changeSearch(searchText));
    }
  }

  return (
    <>
      <div className="sticky top-0 bg-white">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="w-[33%]">
            <FaBars
              className="text-3xl cursor-pointer"
              onClick={() => setDropdown(!dropdown)}
            />
          </div>
          <div className="w-[33%] flex justify-center">
            <Link to="/">
              <img
                src="https://www.freeiconspng.com/thumbs/nike-logo/black-nike-logo-no-background-20.jpg"
                alt="logo"
                className="w-[4.5rem]"
              />
            </Link>
          </div>
          <div className="flex gap-4 items-center w-[33%] justify-end font-semibold">
            <div>
              {search ? (
                <input
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => submitSearch(e)}
                  autoFocus
                  onBlur={() => setSearch(false)}
                  className="px-3 py-1 rounded-lg bg-[#f5f5f7] outline-none"
                />
              ) : (
                <FaSearch
                  className="cursor-pointer"
                  onClick={() => setSearch(true)}
                />
              )}
            </div>
            <div className="items-center hidden md:flex">
              <Link to="wishlist">
                <FaStar />
              </Link>
              {wishlistCount}
            </div>
            <div className="items-center hidden md:flex">
              <Link to="account">
                <FaUser />
              </Link>
            </div>
            <div className="items-center hidden md:flex">
              <Link to="/bag">
                <FaShoppingBag />
              </Link>{" "}
              {cartCount}{" "}
            </div>
            {isLoggedIn && (
              <div>
                <button
                  onClick={() => {
                    dispatch(logout());
                    dispatch(clearCart());
                    dispatch(clearWishlist());
                    navigate("/");
                  }}
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-20 p-1 pb-3 text-xs">
          <div className="hover:font-semibold">
            <Link to="/footwear">FOOTWEAR</Link>
          </div>
          <div className="hover:font-semibold">
            <Link to="/apparel">APPAREL</Link>
          </div>
          <div className="hover:font-semibold">
            <Link to="/accessories">ACCESSORIES</Link>
          </div>
        </div>
      </div>
      {dropdown && <Dropdown />}
    </>
  );
}

export default Navbar;
