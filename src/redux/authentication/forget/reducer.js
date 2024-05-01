import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const forgetSlice = createSlice({
    name: "forget",
    initialState: {
        email: '',
        password:'',
        confirmPassword: '',
        errortext: '',
        loading: false,
        showToast:false,
        secureText:false,
        secureConfirmText:false
    },
    reducers: {
        setEmail: ((state, action) => {
            state.email = action.payload;
        }),
        setPassword: ((state, action) => {
            state.password = action.payload;
        }),
        setConfirmPassword:((state,action)=>{
            state.confirmPassword = action.payload;
        }),
        setErrorText: ((state, action) => {
            state.errortext = action.payload;
        }),
        setSecureText: ((state, action) => {
            state.secureText = action.payload;
        }),
        setSecureConfirm: ((state, action) => {
            state.secureConfirmText = action.payload;
        }),
        setLoading: ((state, action) => {
            state.loading = action.payload;
        }),
        setShowToast:((state,action)=>{
            state.showToast = action.payload
        }),
    },
});
export const { setEmail,setPassword,setConfirmPassword, setErrorText, setSecureText, setSecureConfirm,setLoading,setShowToast} = forgetSlice.actions;
export const forgetReducer = forgetSlice.reducer;