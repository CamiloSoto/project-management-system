import {useDispatch, useSelector} from "react-redux";

import {createTask, findAllTasksByProject, updateTask} from "../services/taskService";
import {loadTaskList, loadTaskSelected} from "../slices/taskSlice"

const useTask = () => {
    const dispatch = useDispatch();

    const {taskSelected, taskList} = useSelector((state: any) => state.task);

    const getTaskListByProject = async (projectId: string) => {
        try {
            const result = await findAllTasksByProject(projectId);
            dispatch(loadTaskList(result?.data));
        } catch (error) {
            return [];
        }
    }

    const postTask = async (task: any, projectId: string) => {
        try {
            const record = await createTask(task);
            await getTaskListByProject(projectId);
            return record;
        } catch (error) {
            return null;
        }
    }

    const putTask = async (task: any) => {
        try {
            await updateTask(task);
        } catch (error) {
            return null;
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