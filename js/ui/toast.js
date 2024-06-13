// const toastTrigger = document.getElementById('liveToastBtn');
// const toastLiveExample = document.getElementById('liveToast');
// const toastBody = document.querySelector('.toast-body');

//     const toast = new bootstrap.Toast(toastLiveExample)
//     toastBody.textContent = 'alert'
//     toast.show()

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

const showAlert = (type, message, title) => {
    // switch(type) {
    //     case 'success':
    //         toastr.success(message, title);
    //         break;
    //     case 'info':
    //         toastr.info(message, title);
    //         break;
    //     case 'warning':
    //         toastr.warning(message, title);
    //         break;
    //     case 'error':
    //         toastr.error(message, title);
    //         break;
    //     default:
    //         console.error('Invalid alert type');
    //         break;
    // }
    toastr.type(message, title);
}

// 사용 
// showAlert('error', 'There are unfilled or invalid fields.', 'Alert');

// const toast = new bootstrap.Toast(toastLiveExample)
// toastBody.textContent = 'alert'
// toast.show()