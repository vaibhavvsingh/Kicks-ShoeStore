import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../store/wishlistSlice";
import { ToastContainer, toast } from "react-toastify";
import backendUrl from "../static/constants";
import { RootState } from "../store/store";

function Wishlist() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userid = useSelector((state: RootState) => state.user.userid);
  const items = useSelector((state: RootState) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function removeWishlistItem(id: number) {
    const response = await fetch(backendUrl + "wishlist", {
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
      console.log("hi");
      dispatch(removeFromWishlist(id));
    }
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
      <ToastContainer />
      <h1 className="text-2xl">WISHLIST</h1>
      {items?.map((item) => (
        <div
          key={item.idwishlist}
          className="relative flex h-48 w-[100%] sm:w-[80%] md:w-[60%] lg:w-[40%] justify-center items-center rounded-lg my-2 mx-4 shadow-md cursor-pointer"
          onClick={() => {
            navigate("/product/" + item.productid);
          }}
        >
          <div className="w-[50%] flex justify-center mx-4">
            <img className="h-44 object-contain" src={item.img} alt="" />
          </div>
          <div className="w-[50%]">
            <div>{item.name}</div>
            <div>{item.brand}</div>
            <div>Rs. {item.price}.00</div>
          </div>
          <div
            className="absolute top-[-10px] right-[-10px] rounded-full text-center bg-red-500 hover:bg-red-700 cursor-pointer w-[25px] h-[25px] text-white"
            onClick={(e) => {
              e.stopPropagation();
              removeWishlistItem(item.idwishlist);
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
