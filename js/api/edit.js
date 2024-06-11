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

    displayLoading();

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
    .then(() => {
        closeModal('#edit-modal')
        return fetchData();
    })
    .then((res) => {
        populateTable(res);
    })
    .catch(console.error)
    .finally(hideLoading)
}

window.addEventListener('load', () => {
    editEmail.addEventListener('blur', handleChangeEditEmail)
    editTelephone.addEventListener('blur', () => checkPhoneValidation(editTelephone, editTelephoneMessage));
    checkUpdateBtn.addEventListener('click', () => checkPhoneValidation(editTelephone, editTelephoneMessage));

    checkUpdateBtn.addEventListener('click', () => {
        debounceTimer && clearTimeout(debounceTimer);
        debounce(handleUpdate);
    });
})