import {createSlice} from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectList: [],
        projectSelected: null,
    },
    reducers: {
        loadProjectList: (state, {payload}) => {
            state.projectList = payload;
        },
        loadProjectSelected: (state, {payload}) => {
            state.projectSelected = payload;
        },
    }
});

export const {
    loadProjectList,
    loadProjectSelected,
} = projectSlice.actions;