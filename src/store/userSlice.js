import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        email: "",
        password: "",
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.password = action.payload.password;
            return state;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.email = "";
            state.password = "";
            return state;
        },
        
    }
    
}) 

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;