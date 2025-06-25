import {configureStore} from "@reduxjs/toolkit";

import {projectSlice} from "../slices/projectSlice.ts";
import {authSlice} from "../slices/authSlice.ts";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        project: projectSlice.reducer,
    }
})

export default store;