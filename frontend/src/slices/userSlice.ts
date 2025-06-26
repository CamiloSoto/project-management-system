import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userList: [],
        userSelected: null,
    },
    reducers: {
        loadUserList: (state, {payload}) => {
            state.userList = payload;
        },
        loadUserSelected: (state, {payload}) => {
            state.userSelected = payload;
        },
    }
});

export const {
    loadUserList,
    loadUserSelected,
} = userSlice.actions;