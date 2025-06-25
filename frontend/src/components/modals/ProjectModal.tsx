import React, {useEffect, useState} from 'react';

import {Button, Card, Modal} from "react-bootstrap";
import {useFormik} from "formik";
import * as yup from "yup";

import InputTextArea from "../inputs/InputTextArea";
import InputText from "../inputs/InputText";

import useProject from "../../hooks/useProject";

interface Props {
    projectId?: string;
}

const ProjectModal: React.FC<Props> = ({projectId}) => {
    const [show, setShow] = useState(false);

    const {getProjectById, projectSelected} = useProject();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            status: "",
            priority: "",
            startDate: "",
            endDate: "",
            managerId: "",
            developersIds: [],
        },
        validationSchema: yup.object({}),
        onSubmit: async (values) => {
            if (projectId) {
                // actualizar
            } else {
                // crear
            }
            console.log(values);
        },
    });

    useEffect(() => {
        if (projectId) {
            getProjectById(`${projectId}`);
        }
    }, [projectId]);

    useEffect(() => {
        if (projectSelected?._id) {
            formik.setFieldValue("name", projectSelected.name);
            formik.setFieldValue("description", projectSelected.description);
            formik.setFieldValue("status", projectSelected.status);
            formik.setFieldValue("priority", projectSelected.priority);
            //formik.setFieldValue("managerId", projectSelected.managerId?._id);
            //formik.setFieldValue("developersIds", );
            formik.setFieldValue("startDate", projectSelected.startDate.split("T")[0]);
            formik.setFieldValue("endDate", projectSelected.endDate.split("T")[0]);
        }
    }, [projectSelected]);

    const handleClose = () => {
        formik.resetForm();
        setShow(false);
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

                                <InputText id="startDate" label="Fecha inicio" type="date" formik={formik}/>
                                <InputText id="endDate" label="Fecha fin" type="date" formik={formik}/>
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

export default ProjectModal;
