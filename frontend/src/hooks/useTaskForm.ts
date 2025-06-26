import {useEffect} from "react";
import {useFormik} from "formik";
import * as yup from "yup";

import useTask from "./useTask";

const useTaskForm = (onSubmit: (values: any, options: any) => void, show: () => void) => {

    const {taskSelected} = useTask();
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
            dueDate: yup.string().required("requerido"),
        }),
        onSubmit
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
            show();
        }
    }, [taskSelected]);
    return formik;
};

export default useTaskForm;
