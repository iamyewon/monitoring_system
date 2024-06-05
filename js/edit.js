const populateEditModal = (e, user) => {
    editUsername.value = user.name;
    editEmail.value = user.email;
    editTelephone.value = user.phone;
    editRole.value = user.role.toLowerCase();
    editId.value = user.id;
}

editTelephone.addEventListener('blur', () => checkPhoneValidation(editTelephone, editTelephoneMessage));

const handleUpdate = () => {
    if(isValidTelephone){
    isValidForm = true;
    }

    if(!isValidForm){
        return;
    }
    displayLoading();

    const params = {
        id: editId.value,
        name: editUsername.value,
        email: editEmail.value,
        phone: editTelephone.value,
        role: editRole.value.toUpperCase(),
        password: 'example01!',
    }

    axios.put(`http://192.168.1.51:5281/users/${params.id}`, params)
    .then((response) => {
        const modalElement = document.querySelector('#edit-modal'); // 모달의 id를 정확히 지정해주세요
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        window.location.reload(); // 되긴하는데,, 
    })
    .catch(console.error)
    .finally(hideLoading)
}

checkUpdateBtn.addEventListener('click', () => {
    checkPhoneValidation(editTelephone, editTelephoneMessage);
});
checkUpdateBtn.addEventListener('click', () => debounce(handleUpdate));