const closeModal = (id) => {
    const modalElement = document.querySelector(id); 
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
}

const resetModal = () => {
    addUsername.value = '';
    addEmail.value = '';
    addTelephone.value = '';
    addRole.value = 'user';
    addPassword.value = '';

    hiddenAlertMessage(addEmailMessage);
    hiddenAlertMessage(addPasswordMessage);
    hiddenAlertMessage(addTelephoneMessage);
}


// TODO 모달 백그라운드 닫힘 막고 / 모달 닫히는 이벤트(혹은 취소 버튼?)에 reset 달아주기 
const addModal = document.querySelector('#add-modal');

const modalInstance = new bootstrap.Modal(addModal, {
    backdrop: 'static',
    keyboard: false
});
  
addBtnMark.addEventListener('click', function() {
    modalInstance.show();
});

addModal.addEventListener('click', (event) => {
    if (event.target === addModal) {
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
});

addModal.addEventListener('hide.bs.modal', () => {
    console.log("닫혔다");
})