///////////////////////////////// add /////////////////////////////////
addUsername.addEventListener('blur', () => checkNameValidation(addUsername, addUsernameMessage));
addEmail.addEventListener('blur', () => checkEmailValidation(addEmail, addEmailMessage));
addTelephone.addEventListener('blur', () => checkPhoneValidation(addTelephone, addTelephoneMessage));
addPassword.addEventListener('blur', () => checkPasswordValidation(addPassword, addPasswordMessage));

// const isValidForm = [isValidEmail, isValidUserName, isValidTelephone, isValidPassword].every(function(item) {
//     return item === true;
// });

const addUser = () => {  
    if(isValidEmail && isValidUserName && isValidTelephone && isValidPassword){
        isValidForm = true;
    }

    if(!isValidForm){
        return;
    }

    const params = {
        username: addUsername.value,
        email: addEmail.value,
        telephone: addTelephone.value,
        role: addRole.value,
        password: addPassword.value
    }
    axios.post('http://localhost:3000/addUser', params)
    .then(
        console.log('success add user')
    ).catch(console.error)
}

const addBtn = document.querySelector('.add-btn');
// addBtn.addEventListener("click", addUser); 
// addBtn 눌렀을 때, 정규식 검사 한번 더 해서 보여주기 
addBtn.addEventListener("click", () => {
    checkNameValidation(addUsername, addUsernameMessage);
    checkEmailValidation(addEmail, addEmailMessage);
    checkPhoneValidation(addTelephone, addTelephoneMessage);
    checkPasswordValidation(addPassword, addPasswordMessage);

    addUser();
}); 