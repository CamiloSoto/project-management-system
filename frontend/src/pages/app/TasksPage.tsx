import {useEffect, useState} from 'react';

import {useSearchParams} from "react-router-dom"

import useTask from "../../hooks/useTask";

import ProjectModal from "../../components/modals/ProjectModal";
import TaskModal from "../../components/modals/TaskModal";
import useProject from "../../hooks/useProject";
import useUser from "../../hooks/useUser";
import TaskFilter from "../../components/filters/TaskFilter.tsx";

const statuses = ['todo', 'in_progress', 'review', 'done'];
const statusLabels: Record<string, string> = {
    todo: 'Por Hacer',
    in_progress: 'En Progreso',
    review: 'Revisión',
    done: 'Hecho',
};


const TasksPage = () => {
    const [tasks, setTasks] = useState<Record<string, any[]>>({
        todo: [],
        in_progress: [],
        review: [],
        done: [],
    });

    const [draggedTask, setDraggedTask] = useState<any>(null);
    const [searchParams] = useSearchParams();

    const {taskList, getTaskListByProject, putTask, setTaskSelected} = useTask();
    const {projectSelected, setProjectSelected} = useProject();
    const {getUserList} = useUser();

    const projectId = searchParams.get('projectId');

    useEffect(() => {
        getTaskListByProject(`${projectId}`);
    }, [projectId]);

    useEffect(() => {
        getUserList();
    }, []);

    useEffect(() => {
        if (taskList) {
            const grouped: Record<string, any[]> = {
                todo: [],
                in_progress: [],
                review: [],
                done: [],
            };
            taskList.forEach((task: any) => {
                grouped[task.status].push(task);
            });
            setTasks(grouped);
        }
    }, [taskList]);

    useEffect(() => {
        return () => {
            setProjectSelected(null);
        }
    }, []);

    const onDragStart = (task: any) => {
        setDraggedTask(task);
    };

    const onDrop = async (status: string) => {
        if (!draggedTask || draggedTask.status === status) return;

        const taskBody = {
            ...draggedTask,
            assignedTo: draggedTask.assignedTo?._id,
            projectId: draggedTask.projectId?._id,
            status,
        };

        try {
            await putTask(taskBody);
            setTasks((prev) => {
                const newState = {...prev};
                newState[draggedTask.status] = newState[draggedTask.status].filter(
                    (t) => t._id !== draggedTask._id
                );
                newState[status] = [taskBody, ...newState[status]];
                return newState;
            });
            setDraggedTask(null);
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>
                    {projectSelected?.name}
                </h3>
                <div className="d-flex gap-2">
                    <ProjectModal projectId={`${projectId}`}/>
                    <TaskModal projectId={`${projectId}`}/>
                </div>
            </div>

            <TaskFilter/>

            <div className="row">
                {statuses.map((status) => (
                    <div
                        key={status}
                        className="col-md-3"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => onDrop(status)}
                    >
                        <h5 className="text-center">{statusLabels[status]}</h5>
                        <div className="bg-light p-2 rounded" style={{minHeight: '400px'}}>
                            {tasks[status].map((task) => (
                                <div
                                    key={task._id}
                                    className="card mb-2"
                                    draggable
                                    onDragStart={() => onDragStart(task)}
                                    style={{cursor: 'grab'}}
                                    onClick={() => setTaskSelected(task)}
                                >
                                    <div className="card-body p-2">
                                        <strong>{task.title}</strong>
                                        <br/>
                                        <small className="text-muted">{task.priority}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TasksPage;
