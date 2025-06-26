import {createSlice} from "@reduxjs/toolkit";

const user = JSON.parse(sessionStorage.getItem('login') || 'null');

const initialAuthState = {
    isAuth: !!user,
    user: user,
};


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        loadLogin: (state, {payload}) => {
            state.isAuth = true;
            state.user = payload;
        },
        loadLogout: (state) => {
            state.isAuth = false;
            state.user = undefined;
        },
    },
});

export const {
    loadLogin,
    loadLogout,
} = authSlice.actions;