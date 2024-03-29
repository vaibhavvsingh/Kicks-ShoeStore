import { useCallback, useEffect, useState } from "react";
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
import { login, logout } from "../store/userSlice";
import { clearCart, getCart } from "../store/cartSlice";
import { clearWishlist, getWishlist } from "../store/wishlistSlice";
import { changeSearch } from "../store/searchSlice";
import { ToastContainer, toast } from "react-toastify";
import backendUrl from "../static/constants";
import { RootState } from "../store/store";

function Navbar() {
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userid = useSelector((state: RootState) => state.user.userid);
  const cartCount = useSelector((state: RootState) => {
    return state.cart?.length;
  });
  const wishlistCount = useSelector((state: RootState) => {
    return state.wishlist?.length;
  });
  const navigate = useNavigate();

  function submitSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      navigate("/");
      dispatch(changeSearch(searchText));
    }
  }
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
  const getCartData = useCallback(
    async function () {
      try {
        const response = await fetch(backendUrl + "cart?userid=" + userid, {
          mode: "cors",
          credentials: "include",
        });
        const items = await response.json();
        if (response.status === 200) {
          dispatch(getCart(items));
        } else {
          toast.error("Could not fetch cart info.\n" + items.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (err) {
        if(err instanceof Error)
        toast.error("Could not fetch cart info.\n" + err.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    [userid, dispatch]
  );
  const getWishlistData = useCallback(
    async function () {
      try {
        const response = await fetch(backendUrl + "wishlist?userid=" + userid, {
          mode: "cors",
          credentials: "include",
        });
        const items = await response.json();
        if (response.status === 200) {
          dispatch(getWishlist(items));
        } else {
          toast.error("Could not fetch wishlist info.\n" + items.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (err) {
        if(err instanceof Error)
        toast.error("Could not fetch wishlist info.\n" + err.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    [userid, dispatch]
  );
  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");
    const user = JSON.parse(userLocalStorage as string);
    if (user && user.isLoggedIn) {
      dispatch(login(user));
    }
    if (isLoggedIn) getCartData();
    if (isLoggedIn) getWishlistData();
  }, [getCartData, isLoggedIn, dispatch, getWishlistData]);

  return (
    <>
      <div className="sticky top-0 bg-white z-10">
        <ToastContainer />
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
                <button onClick={logoutHandle}>
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-10 sm:gap-20 p-1 pb-3 text-xs">
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
      <Dropdown dropdown={dropdown} />
    </>
  );
}

export default Navbar;
