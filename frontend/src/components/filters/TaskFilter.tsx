import {useSearchParams} from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";

import InputSelect from "../inputs/InputSelect";
import useTask from "../../hooks/useTask";
import useUser from "../../hooks/useUser";

const TaskFilter = () => {
    const [searchParams] = useSearchParams();
    const {getTaskListByProject} = useTask();
    const {userList} = useUser()

    const projectId = searchParams.get('projectId');

    const formik = useFormik({
        initialValues: {
            status: "",
            priority: "",
            assignedTo: ""
        },
        validationSchema: yup.object({
            status: yup.string(),
            priority: yup.string(),
            assignedTo: yup.string(),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            try {
                let filters: any = {};

                if (values.status) filters.status = values.status;
                if (values.priority) filters.priority = values.priority;
                if (values.assignedTo) filters.status = values.assignedTo;

                getTaskListByProject(`${projectId}`, filters);
            } catch (err: any) {
                console.log(err)
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
                        {value: "todo", label: "Por Hacer"},
                        {value: "in_progress", label: "En Progreso"},
                        {value: "review", label: "Revisión"},
                        {value: "done", label: "Hecho"},
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

                    <InputSelect
                        id="assignedTo"
                        placeholder="Colaborador"
                        formik={formik}
                        options={userList?.map((user: any) => ({value: user?._id, label: user.name})) || []}
                    />
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary w-100" disabled={formik.isSubmitting}>Buscar</button>
                </div>
            </form>
        </>
    );
};

export default TaskFilter;
