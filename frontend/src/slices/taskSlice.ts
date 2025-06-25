import {createSlice} from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskList: [],
        taskSelected: null,
    },
    reducers: {
        loadTaskList: (state, {payload}) => {
            state.taskList = payload;
        },
        loadTaskSelected: (state, {payload}) => {
            state.taskSelected = payload;
        },
    }
});

export const {
    loadTaskList,
    loadTaskSelected,
} = taskSlice.actions;