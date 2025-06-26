import axiosClient from "../config/axiosClient";

export const findAllTasksByProject = async (projectId: string, params = {}) => {
    try {
        const res = await axiosClient.get(`/tasks/projects/${projectId}/tasks`, {params});
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const createTask = async (task: any) => {
    try {
        const res = await axiosClient.post(`/tasks/projects/${task.projectId}/tasks`, task);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updateTask = async (task: any) => {
    try {
        return await axiosClient.put(`/tasks/${task._id}`, task);
    } catch (error) {
        throw error;
    }
}