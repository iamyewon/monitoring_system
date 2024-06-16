
const showAlert = (message) => {
    const toast = new bootstrap.Toast(toastLiveExample)
    toastBody.textContent = message;
    toast.show()
}