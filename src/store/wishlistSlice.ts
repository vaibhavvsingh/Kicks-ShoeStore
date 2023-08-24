import { createSlice } from "@reduxjs/toolkit";

export interface WishlistItem {
  brand: string,
  category: string,
  desc: string,
  idwishlist: number,
  img: string,
  name: string,
  price: number,
  productid: number,
  sizes: string
  userid: number,
}

const initialState: WishlistItem[] = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    getWishlist: (_state, action) => {
      return action.payload;
    },
    addToWishlist: (state, action) => {
      return [...state, action.payload];
    },
    removeFromWishlist: (state, action) => {
      return state.filter((item) => item.idwishlist !== action.payload);
    },
    clearWishlist: () => {
      return [];
    },
  },
});

export const { getWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
