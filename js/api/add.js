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
        const { code } = error.response.data;

        // switch(code){
        //     case 'ERROR_CODE.EC1004': 
        //         addEmailMessage.textContent = "This email already exists.";
        //         addEmailMessage.classList.remove('hidden');
        //         break;
        //     case 'ERROR_CODE.EC1001': 
        //         alert('[error] There are unfilled fields.');
        //         break;
        //     case 'ERROR_CODE.EC1002':
        //         alert('[error] There are fields that do not meet the validation criteria.');
        //         break;
        //     case ''
        // }
        if(code === ERROR_CODE.EC1004){
            addEmailMessage.textContent = "This email already exists.";
            addEmailMessage.classList.remove('hidden');
        }else if(code === ERROR_CODE.EC1001){
            alert('[error] There are unfilled fields.');
        }else if(code === ERROR_CODE.EC1002){
            console.log("1231232131");
            alert('[error] There are fields that do not meet the validation criteria.');
        }else if(code.length >= 2){
            alert('[error] There are unfilled or invalid fields.')
        }
    })
    .finally(hideLoading)
}

const clickAddBtn = () => {
    checkEmailValidation(addEmail, addEmailMessage);
    checkPhoneValidation(addTelephone, addTelephoneMessage);
    checkPasswordValidation(addPassword, addPasswordMessage);

    debounce(addUser);
}

window.addEventListener('load', () => {
    addPw.addEventListener('click', handleAddPasswordView);
    addEmail.addEventListener('blur', () => checkEmailValidation(addEmail, addEmailMessage));
    addTelephone.addEventListener('blur', () => checkPhoneValidation(addTelephone, addTelephoneMessage));
    addPassword.addEventListener('blur', () => checkPasswordValidation(addPassword, addPasswordMessage));
    addBtn.addEventListener("click", clickAddBtn);
});
