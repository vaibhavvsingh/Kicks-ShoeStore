import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../store/cartSlice";
import { WishlistItem, getWishlist } from "../store/wishlistSlice";
import { toast } from "react-toastify";
import backendUrl from "../static/constants";
import { RootState } from "../store/store";
import { Product as ProductType } from "./Home";

function Product() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType>();
  const [quantity, setQuantity] = useState(1);

  async function addToCartHandler() {
    if (user.isLoggedIn) {
      const response = await fetch(backendUrl + "cart", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          userid: user.userid,
          productid: product?.id,
          quantity,
        }),
      });
      const data = await response.json();
      toast(data.message, { position: toast.POSITION.BOTTOM_CENTER });
      if (response.status === 200) {
        const tempCart = cart.filter((item) => item.productid === product?.id);
        if (tempCart.length !== 0) {
          dispatch(
            getCart(
              cart.map((item) => {
                if (item.productid === tempCart[0].productid) {
                  return {
                    ...product,
                    userid: user.userid,
                    productid: product?.id,
                    quantity,
                  };
                } else {
                  return item;
                }
              })
            )
          );
        } else {
          dispatch(
            getCart([
              ...cart,
              {
                ...product,
                userid: user.userid,
                productid: product?.id,
                quantity,
              },
            ])
          );
        }
      }
    } else navigate("/login");
  }
  async function addToWishlistHandler() {
    if (user.isLoggedIn) {
      const response = await fetch(backendUrl + "wishlist", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          userid: user.userid,
          productid: product?.id,
          quantity,
        }),
      });
      const data = await response.json();
      toast(data.message, { position: toast.POSITION.BOTTOM_CENTER });
      if (response.status === 200) {
        const tempWishlist = wishlist.filter(
          (item: WishlistItem) => item.productid === product?.id
        );
        if (tempWishlist.length === 0) {
          dispatch(
            getWishlist([
              ...wishlist,
              {
                ...product,
                userid: user.userid,
                productid: product?.id,
                quantity,
              },
            ])
          );
        }
      }
    } else navigate("/login");
  }
  const getData = useCallback(async () => {
    try {
      const response = await fetch(backendUrl + "product?id=" + params.id);
      const results = await response.json();
      setProduct(results[0]);
    } catch (err) {
      if (err instanceof Error)
      toast(err.message, { position: toast.POSITION.BOTTOM_CENTER });
    }
  }, [params.id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex flex-col pt-6 md:flex-row">
      <div className="md:w-[60%]">
        <img className="m-auto" src={product?.img} alt="" />
      </div>
      <div className="md:w-[40%] flex flex-col gap-3 px-5 pb-5">
        <p className="text-4xl font-bold">{product?.name}</p>
        <p className="text-2xl">{product?.brand}</p>
        <p className="text-2xl font-semibold">Rs. {product?.price}</p>
        <p className="text-2xl">
          Sizes: <br />
        </p>
        <p className="flex flex-wrap">
          {product?.sizes &&
            JSON.parse(product?.sizes).map((item: number) => (
              <span
                key={item}
                className="bg-slate-300 rounded-sm text-center p-4 mr-2 my-2 w-[15%]"
              >
                {item}
              </span>
            ))}
        </p>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            className="mt-5 p-4 w-[100px] border-slate-300  rounded-sm border-2 mx-5 outline-none"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button
            className="mt-5 p-4 bg-slate-500 rounded-sm text-white mr-5"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
          <button
            className="mt-5 p-4 bg-slate-500 rounded-sm text-white"
            onClick={addToWishlistHandler}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
