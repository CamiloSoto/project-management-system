import React from 'react';
import Select from 'react-select'
import makeAnimated from "react-select/animated";

interface Option {
    label: string;
    value: string;
}

interface Props {
    id: string;
    label?: string;
    options: Option[];
    formik: any;
    multi?: boolean;
}

const InputSearch: React.FC<Props> = ({id, label = '', options, formik, multi = false}) => {
    const animatedComponents = makeAnimated();

    const handleSelectChange = (selected: any) => {
        formik.setFieldValue(id, selected);
    }

    return (
        <>
            <div className="mb-3">
                {label && <label htmlFor={id} className="form-label">{label}</label>}
                <Select
                    id={id}
                    name={id}
                    placeholder=""
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSelectChange}
                    onBlur={() => formik.setFieldTouched(id, true)}
                    value={formik.values[id]}
                    isClearable
                    closeMenuOnSelect={!multi}
                    isMulti={multi}
                    components={animatedComponents}
                    options={options}
                />
                {formik.touched[id] && formik.errors[id] && (
                    <small className="text-danger">{formik.errors[id]}</small>
                )}
            </div>
        </>
    );
};

export default InputSearch;
