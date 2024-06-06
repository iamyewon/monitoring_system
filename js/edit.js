const populateEditModal = (e, user) => {
    editUsername.value = user.name;
    editEmail.value = user.email;
    editTelephone.value = user.phone;
    editRole.value = user.role.toLowerCase();
    editId.value = user.id;
}

// TODO : index 
editTelephone.addEventListener('blur', () => checkPhoneValidation(editTelephone, editTelephoneMessage));

const handleUpdate = () => {
    if(!isValidTelephone){
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
    .then( async(response) => {
        closeModal('#edit-modal')
        populateTable(await fetchData());
    })
    .catch(console.error)
    .finally(hideLoading)
}

checkUpdateBtn.addEventListener('click', () => {
    checkPhoneValidation(editTelephone, editTelephoneMessage);
});
checkUpdateBtn.addEventListener('click', () => {
    debounceTimer && clearTimeout(debounceTimer);
    debounce(handleUpdate);
});