import axiosClient from "../config/axiosClient";
import axiosInterceptor from "../config/axiosInterceptor.ts";

export const findAllProjectList = async (params = {}) => {
    try {
        axiosInterceptor();
        const response = await axiosClient.get("/projects", {params});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const findProjectById = async (projectId: string) => {
    try {
        axiosInterceptor();
        const response = await axiosClient.get(`/projects/${projectId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createProject = async (project: any) => {
    try {
        axiosInterceptor();
        const response = await axiosClient.post(`/projects`, project);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateProject = async (project: any, id: string) => {
    try {
        axiosInterceptor();
        const response = await axiosClient.put(`/projects/${id}`, project);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removeProject = async (id: string) => {
    try {
        axiosInterceptor();
        const response = await axiosClient.delete(`/projects/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}