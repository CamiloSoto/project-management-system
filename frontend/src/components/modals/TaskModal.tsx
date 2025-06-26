import React, {useState} from 'react';

import {Modal, Button, Card} from 'react-bootstrap';

import {questionAlert, successAlert} from "../../helpers/alert.helper";

import validateHttpError from "../../helpers/http-errors";
import InputTextArea from "../inputs/InputTextArea";
import InputSelect from "../inputs/InputSelect";
import InputSearch from "../inputs/InputSearch";
import InputText from "../inputs/InputText";

import useTaskForm from "../../hooks/useTaskForm";
import useTask from "../../hooks/useTask";
import useUser from "../../hooks/useUser";

interface Props {
    projectId: string;
}

const TaskModal: React.FC<Props> = ({projectId}) => {
    const [show, setShow] = useState(false);

    const {postTask, taskSelected, setTaskSelected, putTask, getTaskListByProject, deleteTask} = useTask()
    const {userList} = useUser();

    const onSubmit = async (values: any, {setSubmitting}: any) => {
        const body = {...values, projectId, assignedTo: values?.assignedTo?.value};
        if (taskSelected?._id) {
            try {
                await putTask({...body, _id: taskSelected?._id});
                await successAlert("Tarea actualizada exitosamente");
                handleClose();
            } catch (err: any) {
                await validateHttpError(err);
            } finally {
                setSubmitting(false);
            }
        } else {
            try {
                await postTask(body, projectId);
                await successAlert("Tarea creada exitosamente");
                handleClose();
            } catch (err: any) {
                await validateHttpError(err);
            } finally {
                setSubmitting(false);
            }
        }
        getTaskListByProject(projectId);
    }

    const handleShow = () => setShow(true);

    const formik = useTaskForm(onSubmit, handleShow);

    const handleClose = () => {
        formik.resetForm();
        setTaskSelected(null);
        setShow(false);
    }

    const removeProject = async () => {
        await questionAlert("Seguro que desea eliminar esta tarea?")
            .then(async ({isConfirmed}) => {
                if (isConfirmed) {
                    try {
                        await deleteTask(taskSelected?._id, projectId);
                        setTaskSelected(null);
                        await successAlert("Tarea eliminada exitosamente");
                    } catch (err: any) {
                        await validateHttpError(err);
                    }
                }
            });
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                + Nueva Tarea
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} scrollable size="lg" centered>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Card>
                            <Card.Body>

                                <InputText id="title" label="Titulo" formik={formik}/>
                                <InputTextArea id="description" label="Descripcion" formik={formik}/>

                                <InputSelect id="status" label="Estado" formik={formik} options={[
                                    {value: "todo", label: "Por Hacer"},
                                    {value: "in_progress", label: "En Progreso"},
                                    {value: "review", label: "Revisión"},
                                    {value: "done", label: "Hecho"},
                                ]}/>
                                <InputSelect id="priority" label="Prioridad" formik={formik} options={[
                                    {value: "low", label: "Baja"},
                                    {value: "medium", label: "Media"},
                                    {value: "high", label: "Alta"},
                                ]}/>
                                <InputSearch
                                    id="assignedTo"
                                    label="Asignado a"
                                    options={userList.map((user: any) => ({value: user?._id, label: user.name}))}
                                    formik={formik}
                                />
                                <InputText id="estimatedHours" label="Horas estimadas" type="number" formik={formik}/>
                                <InputText id="actualHours" label="Horas actuales" type="number" formik={formik}/>
                                <InputText id="dueDate" label="Fecha terminacion" type="date" formik={formik}/>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-end gap-3">
                                {
                                    taskSelected?._id ?
                                        <Button variant="danger" type="button" onClick={removeProject}>
                                            Eliminar
                                        </Button> : null
                                }
                                <Button variant="secondary" type="submit" disabled={formik.isSubmitting}>
                                    Guardar
                                </Button>
                            </Card.Footer>
                        </Card>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TaskModal;
