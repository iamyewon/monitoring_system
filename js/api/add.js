const addUser = () => {  
    if(!isValidEmail || !isValidTelephone || !isValidPassword){
        return
    }

    displayLoading();

    const params = {
        name: addUsername.value,
        email: addEmail.value,
        phone: addTelephone.value,
        role: addRole.value,
        password: CryptoJS.SHA256(addPassword.value).toString()
    }
    createUser(params)
    .then(() => {
        closeModal('#add-modal');
        return fetchData();
    })
    .then((res) => {
        populateTable(res);
    })
    .catch((error) => {
        const { code } = error.response.data;
        if(code === ERROR_CODE.EC1004){
            addEmailMessage.textContent = "This email already exists.";
            addEmailMessage.classList.remove('hidden');
        }
    })
    .finally(hideLoading)
}

const clickAddBtn = () => {
    checkEmailValidation(addEmail, addEmailMessage);
    checkPhoneValidation(addTelephone, addTelephoneMessage);
    checkPasswordValidation(addPassword, addPasswordMessage);

    debounceTimer && clearTimeout(debounceTimer);
    debounce(addUser);
}

window.addEventListener('load', () => {
    addPw.addEventListener('click', handleAddPasswordView);
    addEmail.addEventListener('blur', () => checkEmailValidation(addEmail, addEmailMessage));
    addTelephone.addEventListener('blur', () => checkPhoneValidation(addTelephone, addTelephoneMessage));
    addPassword.addEventListener('blur', () => checkPasswordValidation(addPassword, addPasswordMessage));
    addBtn.addEventListener("click", clickAddBtn);
});
