import {useFormik} from 'formik';
import * as Yup from 'yup';

import InputText from "../../components/inputs/InputText.tsx";
import axiosClient from "../../config/axiosClient";
import useAuth from "../../hooks/useAuth";
import {errorAlert, successAlert} from "../../../helpers/alert.helper.ts";

const LoginPage = () => {
    const {login} = useAuth();

    const formik = useFormik({
        initialValues: {
            email: 'admin@test.com',
            password: 'admin123',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Correo inválido').required('Requerido'),
            password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            try {
                const {data} = await axiosClient.post("/auth/login", values);
                await successAlert("Bienvenido")
                login(data.access_token, data.refresh_token, data.user);
            } catch (err: any) {
                if (err.status === 401) {
                    await errorAlert("Credenciales invalidas")
                }
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

                <InputText id="email" label="Correo electronico" formik={formik}/>
                <InputText id="password" label="Contraseña" type="password" formik={formik}/>

                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                    Entrar
                </button>
            </form>
        </>
    );
};

export default LoginPage;
