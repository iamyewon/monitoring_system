
const spaceRegex = /\s/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const phoneRegex = /^010-?\d{3,4}-?\d{4}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,16}$/;

const showAlertMessage = (inputTag, messageTag, message) => {
    messageTag.textContent = message;
    messageTag.classList.remove('hidden');
    inputTag.classList.add('input-alert');
}

const hiddenAlertMessage = (inputTag, messageTag) => {
    messageTag.textContent = '';
    messageTag.classList.add('hidden');
    inputTag.classList.remove('input-alert');
}


// TODO : 매개변수가 길어지면 객체로 묶는다. 
const checkEmailValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        showAlertMessage(inputTag, messageTag,'Please enter a email');
        isValidEmail = false;
    }else if(!emailRegex.test(inputTag.value)){
        showAlertMessage(inputTag, messageTag,'Please enter a valid email');
        isValidEmail = false;
    }else{
        hiddenAlertMessage(inputTag, messageTag);
        isValidEmail = true;
    }
}

const checkPhoneValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        showAlertMessage(inputTag, messageTag,'Please enter a phone');
        isValidTelephone = false;
    }else if(!phoneRegex.test(inputTag.value)){
        showAlertMessage(inputTag, messageTag,'Please enter a valid phone');
        isValidTelephone = false;
    }else{
        hiddenAlertMessage(inputTag, messageTag);
        isValidTelephone = true;
    }
}

const checkPasswordValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        showAlertMessage(inputTag, messageTag,'Please enter a password');
        isValidPassword = false;
    }else if(!passwordRegex.test(inputTag.value)){
        showAlertMessage(inputTag, messageTag,'Please enter a valid password');
        isValidPassword = false;
    }else{
        hiddenAlertMessage(inputTag, messageTag);
        isValidPassword = true;
    }
}