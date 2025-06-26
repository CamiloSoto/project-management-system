import {useEffect} from "react";
import {useFormik} from "formik";
import * as yup from "yup";

import useProject from "./useProject";
import useUser from "./useUser.ts";


const useProjectForm = (onSubmit: (values: any, options: any) => void) => {
    const {projectSelected} = useProject();
    const {userList} = useUser();

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
        onSubmit
    });

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

    return formik;

}

export default useProjectForm;