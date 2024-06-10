const closeModal = (id) => {
    const modalElement = document.querySelector(id); 
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
}

const resetAddModal = () => {
    addUsername.value = '';
    addEmail.value = '';
    addTelephone.value = '';
    addRole.value = 'user';
    addPassword.value = '';

    hiddenAlertMessage(addEmail, addEmailMessage);
    hiddenAlertMessage(addTelephone, addTelephoneMessage);
    hiddenAlertMessage(addPassword, addPasswordMessage);
    resetAddPassword();
}

const resetEditModal = () => {
    editUsername.value = '';
    editEmail.value = '';
    editTelephone.value = '';
    editRole.value = 'user';

    hiddenAlertMessage(editTelephone, editTelephoneMessage);
    resetAddPassword();
}

const setModal = (modalId, resetFunc) => {
    const modalElement = document.querySelector(modalId);
    
    modalElement.addEventListener('click', (event) => {
        if (event.target === modalElement) {
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    });
    
    modalElement.addEventListener('hide.bs.modal', () => {
        resetFunc();
    })
}

    setModal('#add-modal', resetAddModal);
    setModal('#edit-modal', resetEditModal);

