import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";

import {persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";


const rootReducer = combineReducers({


    users:userSlice,


});


const persistConfig ={
    key:'root',
    storage,
    version:1,
};
const persistedReducer =persistReducer(persistConfig, rootReducer);

const store  = configureStore({

    reducer:persistedReducer,
    devTools:true,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:false}),
});
 const  persistor= persistStore(store); 
export  {store,persistor}