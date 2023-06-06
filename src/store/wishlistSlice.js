import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      return [...state, action.payload];
    },
    removeFromWishlist: (state, action) => {
      let index = state.find(action.payload);
      return state.splice(index, 1);
    },
    clearWishlist: (state, action) => {
      return [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
