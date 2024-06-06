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
    axios.post('http://192.168.1.51:5281/users/', params)
    .then(async() => {
        closeModal('#add-modal');
        populateTable(await fetchData());
    }).catch((error) => {
        const { code } = error.response.data;
        if(code === ERROR_CODE.EC1004){
            addEmailMessage.textContent = "이미 존재하는 이메일";
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

 