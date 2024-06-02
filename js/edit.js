///////////////////////////////// update /////////////////////////////////
const populateEditModal = (e, user) => {
    editUsername.value = user.name;
    editEmail.value = user.email;
    editTelephone.value = user.phone;
    editRole.value =  user.role;
    editPassword.value = user.password;
    editId.value = user.id;

    resetEditPassword();
}

editTelephone.addEventListener('blur', () => checkPhoneValidation(editTelephone, editTelephoneMessage));
editPassword.addEventListener('blur', () => checkPasswordValidation(editPassword, editPasswordMessage));

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

    axios.post('http://localhost:3000/updateUser', params)
    .then((response) => {
        console.log("success update");
    }).catch(console.error)
}

checkUpdateBtn.addEventListener('click', () => debounce(handleUpdate));