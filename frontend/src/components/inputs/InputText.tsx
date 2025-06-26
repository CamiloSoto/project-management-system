import React from 'react';

interface Props {
    id: string;
    type?: string;
    label?: string;
    formik: any;
}

const InputText: React.FC<Props> = ({id, type = "text", label = "", formik}) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={id} className="form-label">{label}</label>
                <input
                    className="form-control"
                    type={type}
                    {...formik.getFieldProps(id)}
                />
                {formik?.touched[id] && formik?.errors[id] && (
                    <small className="text-danger">{formik?.errors[id]}</small>
                )}
            </div>
        </>
    );
};

export default InputText;
