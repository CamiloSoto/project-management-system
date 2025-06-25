import {useFormik} from 'formik';
import * as Yup from 'yup';

import {errorAlert, successAlert} from "../../../helpers/alert.helper.ts";
import InputText from "../../components/inputs/InputText.tsx";
import axiosClient from "../../config/axiosClient";
import useAuth from "../../hooks/useAuth";

const RegisterPage = () => {
    const {login} = useAuth();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: 'dev@test.com',
            password: 'dev123',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Requerido'),
            email: Yup.string().email('Correo inválido').required('Requerido'),
            password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            try {
                const {data} = await axiosClient.post("/auth/register", values);
                await successAlert(`Su registro fue exitoso, ${values.name}`)
                login(data.access_token, data.refresh_token, data.user);
            } catch (err: any) {
                if (!err.status) {
                    await errorAlert("Estamos presentando problemas, intente mas tarde")
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <InputText id="name" label="Nombre completo" formik={formik}/>
                <InputText id="email" label="Correo electronico" formik={formik}/>
                <InputText id="password" label="Contraseña" type="password" formik={formik}/>

                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                    Registrarme y entrar
                </button>
            </form>
        </>
    );
};

export default RegisterPage;
