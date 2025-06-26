import {errorAlert, errorsAlert} from "./alert.helper";

const validateHttpError = async (err: any) => {
    if (err.status === 400) {
        const errors = err.response?.data?.message;
        await errorsAlert(errors)
    }
    if (!err.status) {
        await errorAlert("Estamos presentando problemas, intente mas tarde")
    }
};

export default validateHttpError;