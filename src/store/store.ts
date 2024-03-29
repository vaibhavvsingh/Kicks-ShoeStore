import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import userSlice from './userSlice';
import searchSlice from './searchSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice,
        user: userSlice,
        search: searchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;