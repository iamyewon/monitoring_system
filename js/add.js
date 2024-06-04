///////////////////////////////// add /////////////////////////////////
// addUsername.addEventListener('blur', () => checkNameValidation(addUsername, addUsernameMessage));
addEmail.addEventListener('blur', () => checkEmailValidation(addEmail, addEmailMessage));
addTelephone.addEventListener('blur', () => checkPhoneValidation(addTelephone, addTelephoneMessage));
addPassword.addEventListener('blur', () => checkPasswordValidation(addPassword, addPasswordMessage));

// const isValidForm = [isValidEmail, isValidUserName, isValidTelephone, isValidPassword].every(function(item) {
//     return item === true;
// });

const addUser = () => {  
    if(isValidEmail && isValidTelephone && isValidPassword){
        isValidForm = true;
    }

    if(!isValidForm){
        return;
    }

    const params = {
        name: addUsername.value,
        email: addEmail.value,
        phone: addTelephone.value,
        role: addRole.value,
        password: CryptoJS.SHA256(addPassword.value).toString()
    }
    axios.post('http://192.168.1.51:5281/users/', params)
    .then(
        console.log('success add user')
    ).catch(console.error)
}

const addBtn = document.querySelector('.add-btn');
// addBtn.addEventListener("click", addUser); 
// addBtn 눌렀을 때, 정규식 검사 한번 더 해서 보여주기 
addBtn.addEventListener("click", () => {
    // checkNameValidation(addUsername, addUsernameMessage);
    checkEmailValidation(addEmail, addEmailMessage);
    checkPhoneValidation(addTelephone, addTelephoneMessage);
    checkPasswordValidation(addPassword, addPasswordMessage);

    addUser();
}); 