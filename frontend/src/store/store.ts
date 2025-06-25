import {configureStore} from "@reduxjs/toolkit";

import {projectSlice} from "../slices/projectSlice";
import {userSlice} from "../slices/userSlice";
import {authSlice} from "../slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        project: projectSlice.reducer,
    }
})

export default store;