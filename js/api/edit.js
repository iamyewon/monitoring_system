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
    // if(!isValidTelephone || !handleChangeEditEmail()){
    //     return;
    // }

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

        if(res.status === 204){
            return;
        }
        return fetchData();
    })
    .then((res) => {
        res && populateTable(res);
    })
    .catch((error) => {
        if (error.response && error.response.data) {//TODO : 에러 - TypeError: Cannot read properties of undefined (reading 'data')
            const { code } = error.response.data; 
            if(code === ERROR_CODE.EC1001){
                alert('[error] There are unfilled fields.');
            }else if(code === ERROR_CODE.EC1002){
                alert('[error] There are fields that do not meet the validation criteria.');
            }else{
                alert('[error] An unknown error occurred.');
            }
        }
    })
    .finally(hideLoading)
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


