const closeModal = (id) => {
    const modalElement = document.querySelector(id); 
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
}