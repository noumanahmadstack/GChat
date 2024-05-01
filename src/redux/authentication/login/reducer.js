import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        email: '',
        password: '',
        secureText: true,
        errortext: '',
        loading: false,
        showToast:false,
    },
    reducers: {
        setEmail: ((state, action) => {
            state.email = action.payload;
        }),
        setPassword: ((state, action) => {
            state.password = action.payload;
        }),
        setErrorText: ((state, action) => {
            state.errortext = action.payload;
        }),
        setSecureText: ((state, action) => {
            state.secureText = action.payload;
        }),
        setLoading: ((state, action) => {
            state.loading = action.payload;
        }),
        setShowToast:((state,action)=>{
            state.showToast = action.payload
        }),
    },
});
export const { setEmail, setPassword, setErrorText, setSecureText, setLoading,setShowToast} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;