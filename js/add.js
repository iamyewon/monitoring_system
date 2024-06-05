addEmail.addEventListener('blur', () => checkEmailValidation(addEmail, addEmailMessage));
addTelephone.addEventListener('blur', () => checkPhoneValidation(addTelephone, addTelephoneMessage));
addPassword.addEventListener('blur', () => checkPasswordValidation(addPassword, addPasswordMessage));

const addUser = () => {  
    if(isValidEmail && isValidTelephone && isValidPassword){
        isValidForm = true;
    }

    if(!isValidForm){
        return;
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
    .then(() => {
        const modalElement = document.querySelector('#add-modal'); // 모달의 id를 정확히 지정해주세요
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide(); 
    }).catch(console.error)
    .finally(hideLoading)
}

const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener("click", () => {
    checkEmailValidation(addEmail, addEmailMessage);
    checkPhoneValidation(addTelephone, addTelephoneMessage);
    checkPasswordValidation(addPassword, addPasswordMessage);

    debounce(addUser);
}); 