import React from 'react';

interface Option {
    label: string;
    value: string;
}

interface Props {
    id: string;
    type?: string;
    label?: string;
    formik: any;
    options: Option[];
}
const InputSelect: React.FC<Props> = ({id, label = "", formik, options}) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={id} className="form-label">{label}</label>
                <select className="form-select" {...formik.getFieldProps(id)}>
                    <option value="" disabled>-</option>
                    {options.map((option: Option, i: number) => (
                        <option key={i} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {formik.touched[id] && formik.errors[id] && (
                    <small className="text-danger">{formik.errors[id]}</small>
                )}
            </div>
        </>
    );
};

export default InputSelect;
