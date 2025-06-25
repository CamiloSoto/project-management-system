import React from 'react';

interface Props {
    id: string;
    type?: string;
    label?: string;
    formik: any;
}

const InputTextArea: React.FC<Props> = ({id, label, formik}) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={id} className="form-label">{label}</label>
                <textarea
                    className="form-control"
                    rows={3}
                    {...formik.getFieldProps(id)}
                />
                {formik?.touched[id] && formik?.errors[id] && (
                    <small className="text-danger">{formik?.errors[id]}</small>
                )}
            </div>
        </>
    );
};

export default InputTextArea;
