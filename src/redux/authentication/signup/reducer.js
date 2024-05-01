import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const signupSlice = createSlice({
    name: "signup",
    initialState: {
        first_name:"",
        last_name:"",
        email: "",
        phone_number:"",
        password: "",
        secureText: true,
        errortext: '',
        loading: false
    },
    reducers: {
        setfirstName: ((state, action) => {
            state.first_name = action.payload;
        }),
        setlastName: ((state, action) => {
        state.last_name = action.payload;
        }),

        setEmail: ((state, action) => {
            state.email = action.payload;
        }),
        setPhoneNo: ((state, action) => {
        state.phone_number = action.payload;
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
    },
});
export const {setfirstName,setlastName, setEmail, setPhoneNo,setPassword, setErrorText, setSecureText, setLoading } = signupSlice.actions;
export const signupReducer = signupSlice.reducer;