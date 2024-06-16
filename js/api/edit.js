let editEmailValue;
const editEmailMessage = document.querySelector('.edit-email-message');

const populateEditModal = (user) => {
    editUsername.value = user.name;
    editEmail.value = user.email;
    editTelephone.value = user.phone;
    editRole.value = user.role.toLowerCase();
    editId.value = user.id;
    editEmailValue = user.email;
}

const handleChangeEditEmail = () => {
    if (editEmail.value !== editEmailValue) {
        showAlertMessage(editEmail, editEmailMessage, 'The field value cannot be changed')
        return false;
    }
    hiddenAlertMessage(editEmail, editEmailMessage);
    return true;
}

const handleUpdate = () => {
    if(!isValidTelephone || !handleChangeEditEmail()){
        return;
    }

    const params = {
        id: editId.value,
        name: editUsername.value !== '' ? editUsername.value : null,
        email: editEmail.value,
        phone: editTelephone.value,
        role: editRole.value.toUpperCase(),
        password: 'example01!',
    }

    if(editUsername.value === ''){
        params.name === null;
    }

    updateUser(params)
    .then((res) => {
        closeModal('#edit-modal')

        if(res.status === SUCCESS_STATUS.NO_CONTENT){
            showAlert('There are no changes');
            return;
        }
    })
    .catch(handleErrorResponse)
    .finally(() => {
        loadAndDisplayData();
        hideLoading();
    })
}

window.addEventListener('load', () => {
    editEmail.addEventListener('blur', handleChangeEditEmail)
    editTelephone.addEventListener('blur', () => checkPhoneValidation(editTelephone, editTelephoneMessage));
    checkUpdateBtn.addEventListener('click', () => checkPhoneValidation(editTelephone, editTelephoneMessage));
    checkUpdateBtn.addEventListener('click', () => {
        displayLoading();
        debounce(handleUpdate)
    });
})


