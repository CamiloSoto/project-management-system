import {useDispatch, useSelector} from "react-redux";

import {
    findAllProjectList,
    findProjectById,
    createProject,
    updateProject,
    removeProject
} from "../services/projectService";
import {loadProjectList, loadProjectSelected} from "../slices/projectSlice"

const useProject = () => {
    const dispatch = useDispatch();

    const {projectList, projectSelected} = useSelector((state: any) => state.project);

    const getProjectList = async () => {
        try {
            const result = await findAllProjectList();
            dispatch(loadProjectList(result));
        } catch (error) {
            throw error;
        }
    }

    const getProjectById = (projectId: string) => {
        try {
            findProjectById(projectId).then((record: any) => dispatch(loadProjectSelected(record)));
        } catch (error) {
            throw error;
        }
    }

    const postProject = async (project: any) => {
        try {
            const record = await createProject(project);
            await getProjectList();
            return record;
        } catch (error) {
            throw error;
        }
    }

    const putProject = async (project: any, id: string) => {
        try {
            const record = await updateProject(project, id);
            await getProjectList();
            return record;
        } catch (error) {
            throw error;
        }
    }

    const deleteProject = async (id: string) => {
        try {
            const record = await removeProject(id);
            await getProjectList();
            return record;
        } catch (error) {
            throw error;
        }
    }

    const setProjectSelected = (project: any) => {
        dispatch(loadProjectSelected(project));
    }

    return {
        projectList,
        projectSelected,
        postProject,
        getProjectList,
        getProjectById,
        setProjectSelected,
        putProject,
        deleteProject
    }
}

export default useProject;