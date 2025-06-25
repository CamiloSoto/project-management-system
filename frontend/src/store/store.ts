import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../slices/authSlice.ts";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})

export default store;