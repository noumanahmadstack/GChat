import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
       chat:[],
       conversation:[],
       chatConversation:[],
       isLoading:false
    },
    reducers: {
        setChat: ((state, action) => {
            state.chat = action.payload;
        }),
        setIsLoading:((state,action)=>{
            state.isLoading = action.payload
        }),
        setConversation: ((state, action) => {
            state.conversation = action.payload;
        }),
        setChatConversation: ((state, action) => {
            state.chatConversation = action.payload;
        }),
        clearChatConversation: (state) => {
            state.chatConversation = [];
        },
    }, 
});
export const {setChat,setIsLoading,setConversation,setChatConversation,clearChatConversation} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;