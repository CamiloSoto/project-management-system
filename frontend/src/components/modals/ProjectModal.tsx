import React, {useEffect, useState} from 'react';

import {Button, Card, Modal} from "react-bootstrap";
import {useFormik} from "formik";
import * as yup from "yup";

import InputTextArea from "../inputs/InputTextArea";
import InputSearch from "../inputs/InputSearch.tsx";
import InputText from "../inputs/InputText";

import {errorAlert, errorsAlert, successAlert} from "../../helpers/alert.helper.ts";
import useProject from "../../hooks/useProject";
import useUser from "../../hooks/useUser.ts";

interface Props {
    projectId?: string;
}

const ProjectModal: React.FC<Props> = ({projectId}) => {
    const [show, setShow] = useState(false);

    const {getProjectById, projectSelected, postProject, putProject} = useProject();
    const {userList, getUserList} = useUser();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            status: "",
            priority: "",
            startDate: "",
            endDate: "",
            managerId: {value: "", label: ""},
            developersIds: [],
        },
        validationSchema: yup.object({
            name: yup.string().required("campo requerido"),
            description: yup.string(),
            status: yup.string().required("campor requerido"),
            priority: yup.string().required("campor requerido"),
            startDate: yup.string().required("campor requerido"),
            endDate: yup.string().required("campor requerido"),
            managerId: yup.object().required("campo requerido"),
            developersIds: yup.array().of(yup.object()),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            let managerId = values?.managerId?.value;
            let developersIds = values?.developersIds?.map((dev: any) => dev.value);
            const body = {...values, managerId, developersIds};

            if (projectId) {
                try {
                    await putProject(body, projectId);
                    await successAlert("Proyecto actualizado exitosamente");
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
                    await postProject(body);
                    await successAlert("Proyecto creado exitosamente");
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
        },
    });

    useEffect(() => {
        if (projectId) {
            getProjectById(`${projectId}`);
        }
    }, [projectId]);

    useEffect(() => getUserList, []);

    useEffect(() => {
        if (projectSelected?._id) {
            formik.setFieldValue("name", projectSelected.name);
            formik.setFieldValue("description", projectSelected.description);
            formik.setFieldValue("status", projectSelected.status);
            formik.setFieldValue("priority", projectSelected.priority);
            formik.setFieldValue("managerId", {
                value: projectSelected.managerId?._id,
                label: projectSelected.managerId?.name
            });
            formik.setFieldValue("developersIds", projectSelected.developersIds?.map((dev: any) => {
                const user = userList?.find((user: any) => user?._id === dev);
                return {value: dev, label: user?.name}
            }) || []);

            formik.setFieldValue("startDate", projectSelected.startDate.split("T")[0]);
            formik.setFieldValue("endDate", projectSelected.endDate.split("T")[0]);
        }
    }, [projectSelected]);

    const handleClose = () => {
        if (!projectId) {
            formik.resetForm();
        }
        setShow(false);
    }

    const removeProject = async () => {
        console.log("removeProject", projectId);
    }

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                {projectId ? "Editar" : "Agregar"}
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} scrollable size="lg" centered>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Card>
                            <Card.Body>

                                <InputText id="name" label="Nombre" formik={formik}/>
                                <InputTextArea id="description" label="Descripcion" formik={formik}/>

                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Estado</label>
                                    <select className="form-select" {...formik.getFieldProps('status')}>
                                        <option value="">-</option>
                                        <option value="planning">Planeacion</option>
                                        <option value="in_progress">En Progreso</option>
                                        <option value="completed">Completado</option>
                                        <option value="cancelled">Cancelado</option>
                                    </select>
                                    {formik.touched.status && formik.errors.status && (
                                        <small className="text-danger">{formik.errors.status}</small>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="priority" className="form-label">Prioridad</label>
                                    <select className="form-select" {...formik.getFieldProps('priority')}>
                                        <option value="">-</option>
                                        <option value="low">Baja</option>
                                        <option value="medium">Media</option>
                                        <option value="high">Alta</option>
                                    </select>
                                    {formik.touched.priority && formik.errors.priority && (
                                        <small className="text-danger">{formik.errors.priority}</small>
                                    )}
                                </div>

                                <InputSearch
                                    id="managerId"
                                    label="Dueño"
                                    options={userList?.map((user: any) => ({value: user?._id, label: user.name}))}
                                    formik={formik}
                                />

                                <InputSearch
                                    id="developersIds"
                                    label="Colaboradores"
                                    options={userList?.map((user: any) => ({value: user?._id, label: user.name}))}
                                    formik={formik}
                                    multi={true}
                                />

                                <InputText id="startDate" label="Fecha inicio" type="date" formik={formik}/>
                                <InputText id="endDate" label="Fecha fin" type="date" formik={formik}/>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-end gap-3">
                                {
                                    projectId ?
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

export default ProjectModal;
