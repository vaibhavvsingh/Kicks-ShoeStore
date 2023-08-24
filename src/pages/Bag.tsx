import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, removeFromCart } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import useRazorpay from "react-razorpay";
import backendUrl from "../static/constants";
import { RootState } from "../store/store";

function Bag() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userid = useSelector((state: RootState) => state.user.userid);
  const items = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Razorpay] = useRazorpay();

  async function removeCartItem(id: number) {
    const response = await fetch(backendUrl + "cart", {
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

  const handlePayment = useCallback(async () => {
    async function deleteAllItems() {
      const res = await fetch(backendUrl + "cart/all", {
        method: "delete",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
        }),
      });
      if (res.status === 200) dispatch(clearCart());
    }

    const response = await fetch(backendUrl + "razorpay", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid,
      }),
    });
    const data = await response.json();

    const options = {
      key: "rzp_test_cQBOooxXHP2UNA",
      amount: data.amount,
      currency: data.currency,
      name: "Nike Fashion",
      description: "Test Transaction",
      image: "https://www.freeiconspng.com/img/49338",
      order_id: data.id,
      handler: () => {
        toast.success("Payment Succesful!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        deleteAllItems();
      },
    };
    const paymentObject = new Razorpay(options);
    paymentObject.open();
  }, [Razorpay, userid, dispatch]);

  if (!items || !items.length) {
    return <div className="text-center mt-4 text-2xl">CART IS EMPTY!</div>;
  }
  return (
    <div className="flex my-6 flex-col md:flex-row max-w-[900px] m-auto">
      <div className="flex flex-col items-center mx-4 flex-1">
        <ToastContainer />
        <h1 className="text-2xl font-semibold">CART</h1>
        {items?.map((item, index) => (
          <div
            key={index}
            className="relative flex h-48 w-[100%]  justify-center items-center rounded-lg my-2 mx-4 shadow-md cursor-pointer"
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
              <div>Quantity: {item.quantity}</div>
            </div>
            <div
              className="absolute top-[-10px] right-[-10px] rounded-full text-center bg-red-500 hover:bg-red-700 cursor-pointer w-[25px] h-[25px] text-white"
              onClick={(e) => {
                e.stopPropagation();
                removeCartItem(item.id);
              }}
            >
              X
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col items-center sticky">
        <h1 className="text-2xl font-semibold">CHECK OUT</h1>
        <button
          className="text-white bg-black p-2 rounded-sm mt-4"
          onClick={handlePayment}
        >
          Pay ₹
          {items && Array.isArray(items) && items.length !== 0
            ? items.reduce((acc, item) => {
                return acc + item.price * item.quantity;
              }, 0)
            : "0"}
          .00
        </button>
      </div>
    </div>
  );
}

export default Bag;
