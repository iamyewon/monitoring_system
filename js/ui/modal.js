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
}

const resetEditModal = () => {
    editUsername.value = '';
    editEmail.value = '';
    editTelephone.value = '';
    editRole.value = 'user';
    // editPassword.value = '';

    hiddenAlertMessage(addEmail, addEmailMessage);
    hiddenAlertMessage(addTelephone, addTelephoneMessage);
    // hiddenAlertMessage(addPassword, addPasswordMessage);
}

// TODO 모달 백그라운드 닫힘 막기
const setModal = (modalId, button, resetFunc) => {
    const modalElement = document.querySelector(modalId);
    const btnElement = document.querySelector(button);

    const modalInstance = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false
    });
      
    // btnElement.addEventListener('click', function() {
    //     modalInstance.show();
    // });
    
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

// window.addEventListener('load', () => {
    setModal('#add-modal', '.add-btn-mark', resetAddModal);
    // setModal('#edit-modal', '.edit-btn', resetEditModal);
// })
