import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: '',
    },
    reducers: {
        setUserData: ((state, action) => {
            state.userData = action.payload;
        }),
    },
});
export const { setUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;