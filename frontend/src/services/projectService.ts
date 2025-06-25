import axiosClient from "../config/axiosClient";
import axiosInterceptor from "../config/axiosInterceptor.ts";

export const findAllProjectList = async () => {
    try {
        axiosInterceptor();
        const response = await axiosClient.get("/projects");
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