import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  brand: string,
  category: string,
  desc: string,
  id: number,
  img: string,
  name: string,
  price: number,
  productid: number,
  sizes: string
  userid: number,
  quantity: number
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (_state, action) => {
      return action.payload;
    },
    addToCart: (state, action) => {
      return [...state, action.payload];
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { getCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
