import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLayoutLoading: false,
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLayoutLoading: (state, action) => {
            const isLoading = action.payload;
            state.isLayoutLoading = isLoading;
        }
    }
})

export const { setLayoutLoading } = appSlice.actions;
export default appSlice.reducer;