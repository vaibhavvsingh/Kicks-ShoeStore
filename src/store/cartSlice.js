import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            return [...state, action.payload];
        },
        removeFromCart: (state, action) => {
            let index = state.find(action.payload);
            return state.splice(index, 1);
        }
    }
});

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;