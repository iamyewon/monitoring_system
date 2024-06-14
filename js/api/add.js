const addUser = () => {  
    if(!isValidEmail || !isValidTelephone || !isValidPassword){
        return
    }

    displayLoading();

    const params = {
        name: addUsername.value !== '' ? addUsername.value : null,
        email: addEmail.value,
        phone: addTelephone.value,
        role: addRole.value,
        password: CryptoJS.SHA256(addPassword.value).toString()
    }
    createUser(params)
    .then((result) => {
        console.log(result);
        closeModal('#add-modal');
        return fetchData();
    })
    .then((res) => {
        populateTable(res);
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            const { code } = error.response.data;
            // TODO : 한번에 두가지 왔을 때 처리 가능 ? 
            switch(code){
                case ERROR_CODE.EC1004: 
                    addEmailMessage.textContent = "This email already exists.";
                    addEmailMessage.classList.remove('hidden');
                    break;
                case ERROR_CODE.EC1001: 
                    alert('[error] There are unfilled fields.');
                    break;
                case ERROR_CODE.EC1002:
                    alert('[error] There are fields that do not meet the validation criteria.');
                    break;
                default: 
                    alert('[error] An unknown error occurred.');
            }

            // if(code === ERROR_CODE.EC1004){
            //     addEmailMessage.textContent = "This email already exists.";
            //     addEmailMessage.classList.remove('hidden');
            // }else if(code === ERROR_CODE.EC1001){
            //     alert('[error] There are unfilled fields.');
            // }else if(code === ERROR_CODE.EC1002){
            //     alert('[error] There are fields that do not meet the validation criteria.');
            // }else{
            //     alert('[error] An unknown error occurred.');
            // }
        }
    })
    .finally(hideLoading)
}

const clickAddBtn = () => {
    checkEmailValidation(addEmail, addEmailMessage);
    checkPhoneValidation(addTelephone, addTelephoneMessage);
    checkPasswordValidation(addPassword, addPasswordMessage);

    // TODO : 로딩 안뜸 ! 
    // displayLoading();
    debounce(addUser);
}

window.addEventListener('load', () => {
    addPw.addEventListener('click', handleAddPasswordView);
    addEmail.addEventListener('blur', () => checkEmailValidation(addEmail, addEmailMessage));
    addTelephone.addEventListener('blur', () => checkPhoneValidation(addTelephone, addTelephoneMessage));
    addPassword.addEventListener('blur', () => checkPasswordValidation(addPassword, addPasswordMessage));
    addBtn.addEventListener("click", () => {
        // displayLoading();
        clickAddBtn();
    });
});
