import {configureStore} from "@reduxjs/toolkit";

import {projectSlice} from "../slices/projectSlice";
import {userSlice} from "../slices/userSlice";
import {authSlice} from "../slices/authSlice";
import {taskSlice} from "../slices/taskSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        project: projectSlice.reducer,
        task: taskSlice.reducer
    }
})

export default store;