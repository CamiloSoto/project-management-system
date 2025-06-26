import React, {useEffect, useState} from 'react';

import {Button, Card, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import InputTextArea from "../inputs/InputTextArea";
import InputSearch from "../inputs/InputSearch.tsx";
import InputText from "../inputs/InputText";

import {questionAlert, successAlert} from "../../helpers/alert.helper.ts";
import validateHttpError from "../../helpers/http-errors.ts";
import useProjectForm from "../../hooks/useProjectForm";
import useProject from "../../hooks/useProject";
import useUser from "../../hooks/useUser.ts";
import InputSelect from "../inputs/InputSelect.tsx";

interface Props {
    projectId?: string;
}

const ProjectModal: React.FC<Props> = ({projectId}) => {
    const [show, setShow] = useState(false);

    const {getProjectById, postProject, putProject, deleteProject, setProjectSelected} = useProject();
    const {userList, getUserList} = useUser();

    const navigate = useNavigate();

    const handleSubmit = async (values: any, {setSubmitting}: any) => {
        let managerId = values?.managerId?.value;
        let developersIds = values?.developersIds?.map((dev: any) => dev.value);
        const body = {...values, managerId, developersIds};
        if (projectId) {
            try {
                await putProject(body, projectId);
                await successAlert("Proyecto actualizado exitosamente");
                handleClose();
            } catch (err: any) {
                await validateHttpError(err)
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
                await validateHttpError(err)
            } finally {
                setSubmitting(false);
            }
        }
    }
    const formik = useProjectForm(handleSubmit)

    useEffect(() => {
        if (projectId) getProjectById(`${projectId}`);
    }, [projectId]);

    useEffect(() => getUserList, []);

    const handleClose = () => {
        if (!projectId) formik.resetForm();
        setShow(false);
    }

    const removeProject = async () => {
        await questionAlert("Seguro que desea eliminar este proyecto?")
            .then(async ({isConfirmed}) => {
                if (isConfirmed) {
                    try {
                        await deleteProject(`${projectId}`);
                        setProjectSelected(null);
                        await successAlert("Proyecto eliminado exitosamente");
                        navigate("/projects");
                    } catch (err: any) {
                        await validateHttpError(err);
                    }
                }
            });
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

                                <InputSelect id="status" label="Estado" formik={formik} options={[
                                    {value: "planning", label: "Planeacion"},
                                    {value: "in_progress", label: "En Progreso"},
                                    {value: "completed", label: "Completado"},
                                    {value: "cancelled", label: "Cancelado"},
                                ]}/>

                                <InputSelect id="priority" label="Prioridad" formik={formik} options={[
                                    {value: "low", label: "Baja"},
                                    {value: "medium", label: "Media"},
                                    {value: "high", label: "Alta"},
                                ]}/>

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
