import { configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { loginReducer } from '../authentication/login/reducer';
import { userReducer } from '../user/reducer';
import { chatReducer } from '../chat/reducer';
// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     whiteList: ['userReducer'],  //this is for persistant reducers
//      blacklist: ['loginReducer'], // this is for non-persistant reducers
// }
const appReducer = combineReducers({
     loginReducer,
     userReducer,
     chatReducer
})


// // const persistedReducer = () => {
// //      return persistReducer(persistConfig, appReducer)
// //    };
export const store = configureStore({
    reducer: appReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

});
// export const persistor = persistStore(store)

