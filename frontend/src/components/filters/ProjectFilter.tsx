import {useFormik} from "formik";
import * as yup from "yup";

import useProject from "../../hooks/useProject";
import InputSelect from "../inputs/InputSelect";
import InputText from "../inputs/InputText";

const ProjectFilter = () => {

    const {getProjectList} = useProject();

    const formik = useFormik({
        initialValues: {
            status: "",
            priority: "",
            text: ""
        },
        validationSchema: yup.object({
            status: yup.string(),
            priority: yup.string(),
            text: yup.string(),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            try {
                getProjectList(values);
            } catch (err: any) {

            } finally {
                setSubmitting(false);
            }
        }
    })
    return (
        <>
            <form className="row" onSubmit={formik.handleSubmit} noValidate>
                <div className="col-md-3">
                    <InputSelect id="status" placeholder="Estado" formik={formik} options={[
                        {value: "planning", label: "Planeacion"},
                        {value: "in_progress", label: "En Progreso"},
                        {value: "completed", label: "Completado"},
                        {value: "cancelled", label: "Cancelado"},
                    ]}/>
                </div>
                <div className="col-md-3">
                    <InputSelect id="priority" placeholder="Prioridad" formik={formik} options={[
                        {value: "low", label: "Baja"},
                        {value: "medium", label: "Media"},
                        {value: "high", label: "Alta"},
                    ]}/>
                </div>
                <div className="col-md-3">
                    <InputText id="text" placeholder="Nombre" formik={formik}/>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary w-100" disabled={formik.isSubmitting}>Buscar</button>
                </div>
            </form>
        </>
    );
};

export default ProjectFilter;
