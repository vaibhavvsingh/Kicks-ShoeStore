import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        changeSearch: (state, action)=> {
            return action.payload;
        }
    }
})

export const { changeSearch } = searchSlice.actions;
export default searchSlice.reducer;