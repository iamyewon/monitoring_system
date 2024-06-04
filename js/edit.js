///////////////////////////////// update /////////////////////////////////
const populateEditModal = (e, user) => {
    editUsername.value = user.name;
    editEmail.value = user.email;
    editTelephone.value = user.phone;
    editRole.value = user.role.toLowerCase();
    editPassword.value = user.password;
    editId.value = user.id;

    resetEditPassword();
}

editTelephone.addEventListener('blur', () => checkPhoneValidation(editTelephone, editTelephoneMessage));

const handleUpdate = () => {
    if(isValidTelephone && isValidPassword){
        isValidForm = true;
    }

    if(!isValidForm){
        return;
    }

    const params = {
        id: editId.value,
        name: editUsername.value,
        email: editEmail.value,
        phone: editTelephone.value,
        role: editRole.value,
        password: editPassword.value,
    }

    axios.put(`http://192.168.1.51:5281/users/${params.id}`, params)
    .then((response) => {
        console.log("Success update");
    })
    .catch(console.error);
}

checkUpdateBtn.addEventListener('click', () => {
    checkPhoneValidation(editTelephone, editTelephoneMessage);
    checkPasswordValidation(editPassword, editPasswordMessage)
});
checkUpdateBtn.addEventListener('click', () => debounce(handleUpdate));