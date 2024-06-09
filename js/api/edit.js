const populateEditModal = (user) => {
    editUsername.value = user.name;
    editEmail.value = user.email;
    editTelephone.value = user.phone;
    editRole.value = user.role.toLowerCase();
    editId.value = user.id;
}

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

