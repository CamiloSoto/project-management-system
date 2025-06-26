import React, {useEffect, useState} from 'react';

import {Modal, Button, Card} from 'react-bootstrap';
import {useFormik} from "formik";
import * as yup from "yup";

import {errorAlert, errorsAlert, successAlert} from "../../helpers/alert.helper";
import InputTextArea from "../inputs/InputTextArea";
import InputSearch from "../inputs/InputSearch";
import InputText from "../inputs/InputText";
import useTask from "../../hooks/useTask";
import useUser from "../../hooks/useUser";
import InputSelect from "../inputs/InputSelect.tsx";

interface Props {
    projectId: string;
}

const TaskModal: React.FC<Props> = ({projectId}) => {
    const [show, setShow] = useState(false);

    const {postTask, taskSelected, setTaskSelected, putTask, getTaskListByProject} = useTask()
    const {userList} = useUser();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            status: "todo",
            priority: "medium",
            assignedTo: null,
            estimatedHours: 0,
            actualHours: 0,
            dueDate: ""
        },
        validationSchema: yup.object({
            title: yup.string().required("requerido"),
            description: yup.string(),
            status: yup.string().required("requerido"),
            priority: yup.string().oneOf(["low", "medium", "high"], "requerido").required("requerido"),
            assignedTo: yup.object({
                value: yup.string().required("requerido"),
                label: yup.string(),
            }).required("requerido"),
            estimatedHours: yup.number(),
            actualHours: yup.number(),
            dueDate: yup.string()
        }),
        onSubmit: async (values: any, {setSubmitting}) => {
            const body = {...values, projectId, assignedTo: values?.assignedTo?.value};
            if (taskSelected?._id) {
                try {
                    await putTask({...body, _id: taskSelected?._id});
                    await successAlert("Tarea actualizada exitosamente");
                    formik.resetForm();
                    handleClose();
                } catch (err: any) {
                    if (err.status === 400) {
                        const errors = err.response?.data?.message;
                        await errorsAlert(errors)
                    }
                    if (!err.status) {
                        await errorAlert("Estamos presentando problemas, intente mas tarde")
                    }
                } finally {
                    setSubmitting(false);
                }
            } else {
                try {
                    await postTask(body, projectId);
                    await successAlert("Tarea creada exitosamente");
                    formik.resetForm();
                    handleClose();
                } catch (err: any) {
                    if (err.status === 400) {
                        const errors = err.response?.data?.message;
                        await errorsAlert(errors)
                    }
                    if (!err.status) {
                        await errorAlert("Estamos presentando problemas, intente mas tarde")
                    }
                } finally {
                    setSubmitting(false);
                }
            }
            getTaskListByProject(projectId);
        }
    })

    useEffect(() => {
        if (taskSelected?._id) {
            formik.setFieldValue("title", taskSelected.title);
            formik.setFieldValue("description", taskSelected.description);
            formik.setFieldValue("status", taskSelected.status);
            formik.setFieldValue("priority", taskSelected.priority);
            formik.setFieldValue("assignedTo", {
                value: taskSelected.assignedTo?._id,
                label: taskSelected.assignedTo?.name
            });
            formik.setFieldValue("estimatedHours", taskSelected.estimatedHours);
            formik.setFieldValue("actualHours", taskSelected.actualHours);
            formik.setFieldValue("dueDate", taskSelected.dueDate.split("T")[0]);
            handleShow();
        }
    }, [taskSelected]);

    const handleClose = () => {
        formik.resetForm();
        setTaskSelected(null);
        setShow(false);
    }

    const handleShow = () => setShow(true);

    // @ts-ignore
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
                            <Card.Footer className="d-flex justify-content-end">
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
