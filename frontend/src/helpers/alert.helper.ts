import Swal from "sweetalert2";

export const successAlert = (message: string) => {
    return Swal.fire({
        icon: 'success',
        title: message,
        confirmButtonText: "Ok",
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
}

export const questionAlert = (message: string) => {
    return Swal.fire({
        icon: 'question',
        title: message,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
}

export const errorAlert = (message: string) => {
    return Swal.fire({
        icon: 'error',
        title: message,
        confirmButtonText: "Ok",
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
}

export const errorsAlert = async (messages: string[]) => {
    const htmlList = `<ul style="text-align: left;">${messages.map(msg => `<li>${msg}</li>`).join('')}</ul>`;

    await Swal.fire({
        icon: 'error',
        html: htmlList,
        confirmButtonText: "Ok",
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    });
};