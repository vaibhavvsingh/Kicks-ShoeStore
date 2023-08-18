import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    getWishlist: (state, action) => {
      return action.payload;
    },
    addToWishlist: (state, action) => {
      return [...state, action.payload];
    },
    removeFromWishlist: (state, action) => {
      return state.filter((item) => item.idwishlist !== action.payload);
    },
    clearWishlist: (state, action) => {
      return [];
    },
  },
});

export const { getWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
