import {useDispatch, useSelector} from "react-redux";

import {createTask, findAllTasksByProject, updateTask} from "../services/taskService";
import {loadTaskList, loadTaskSelected} from "../slices/taskSlice"

const useTask = () => {
    const dispatch = useDispatch();

    const {taskSelected, taskList} = useSelector((state: any) => state.task);

    const getTaskListByProject = (projectId: string, params = {}) => {
        try {
            findAllTasksByProject(projectId, params).then((res: any) => dispatch(loadTaskList(res)));
        } catch (error) {
            return [];
        }
    }

    const postTask = async (task: any, projectId: string) => {
        try {
            const record = await createTask(task);
            getTaskListByProject(projectId);
            return record;
        } catch (error) {
            throw error;
        }
    }

    const putTask = async (task: any) => {
        try {
            await updateTask(task);
        } catch (error) {
            throw error;
        }
    }

    const setTaskSelected = (task: any | null) => {
        dispatch(loadTaskSelected(task));
    }

    return {
        taskList,
        taskSelected,
        getTaskListByProject,
        postTask,
        putTask,
        setTaskSelected
    }
}

export default useTask;