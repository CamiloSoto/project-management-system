import {useEffect, useState} from "react";

import {Modal, Button, Card} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as yup from 'yup';

import InputSelect from "../inputs/InputSelect";
import InputText from "../inputs/InputText";
import useUser from "../../hooks/useUser";
import validateHttpError from "../../helpers/http-errors.ts";
import {successAlert} from "../../helpers/alert.helper.ts";

const UserModal = () => {
    const [show, setShow] = useState(false);

    const {userSelected, setUserSelected, postUser, putUser} = useUser();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: "",
            avatar: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("campo requerido"),
            email: yup.string().required("campo requerido"),
            password: yup.string().when([], () => {
                return userSelected?._id
                    ? yup.string()
                    : yup.string()
                        .required("campo requerido")
                        .min(6, "mínimo 6 caracteres");
            }),
            role: yup.string().required("campo requerido"),
            avatar: yup.string(),
        }),
        onSubmit: async (values: any, {setSubmitting}) => {
            if (userSelected?._id) {
                try {
                    delete values?.password;
                    await putUser({...values, _id: userSelected?._id});
                    await successResponse("Usuario actualizado exitosamente", setSubmitting)
                } catch (err: any) {
                    await validateHttpError(err);
                }
            } else {
                try {
                    await postUser(values);
                    await successResponse("Usuario creado exitosamente", setSubmitting)
                } catch (err: any) {
                    await validateHttpError(err);
                }
            }
        }
    });

    useEffect(() => {
        if (userSelected?._id) {
            formik.setValues({
                name: userSelected.name,
                email: userSelected.email,
                password: "",
                role: userSelected.role,
                avatar: userSelected.avatar,
            });
            setShow(true);
        }
    }, [userSelected]);

    const successResponse = async (msg: string, setSubmitting: any) => {
        await successAlert(msg);
        setSubmitting(false);
        handleClose();
    }

    const handleRemove = () => {
        console.log(userSelected);
    }

    const handleClose = () => {
        if (userSelected?._id) {
            setUserSelected(null);
        }
        formik.resetForm();
        setShow(false);
    }

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                + Nuevo Usuario
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} scrollable size="lg"
                   centered>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Card>
                            <Card.Body>

                                <InputText id="name" label="Nombre" formik={formik}/>
                                <InputText id="email" label="Correo electronico" formik={formik}/>
                                {
                                    userSelected?._id ? null : (
                                        <InputText id="password" type="password" label="Contraseña" formik={formik}/>
                                    )
                                }
                                <InputSelect id="role" label="Rol" formik={formik} options={[
                                    {value: "admin", label: "Administrador"},
                                    {value: "manager", label: "Manager"},
                                    {value: "developer", label: "Desarrollador"},
                                ]}/>

                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-end gap-3">
                                {
                                    userSelected?._id ?
                                        <Button variant="danger" type="button" onClick={handleRemove}>
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

export default UserModal;
