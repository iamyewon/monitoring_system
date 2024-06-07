
const spaceRegex = /\s/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
// const phoneRegex = /^(01[016789]-?\d{3,4}-?\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/; // 핸드폰, 지역번호 모두 허용 
const phoneRegex = /^010-?\d{4}-?\d{4}$/; // 하이픈 허용 
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,16}$/;

const showAlertMessage = (messageTag, message) => {
    messageTag.textContent = message;
    messageTag.classList.remove('hidden');
}

const hiddenAlertMessage = (messageTag) => {
    messageTag.textContent = '';
    messageTag.classList.add('hidden');
}

const checkEmailValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        showAlertMessage(messageTag,'Please enter a email');
        isValidEmail = false;
    }else if(!emailRegex.test(inputTag.value)){
        showAlertMessage(messageTag,'Please enter a valid email');
        isValidEmail = false;
    }else{
        hiddenAlertMessage(messageTag);
        isValidEmail = true;
    }
}

const checkPhoneValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        showAlertMessage(messageTag,'Please enter a phone');
        isValidTelephone = false;
    }else if(!phoneRegex.test(inputTag.value)){
        showAlertMessage(messageTag,'Please enter a valid phone');
        isValidTelephone = false;
    }else{
        hiddenAlertMessage(messageTag);
        isValidTelephone = true;
    }
}

const checkPasswordValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        showAlertMessage(messageTag,'Please enter a password');
        isValidPassword = false;
    }else if(!passwordRegex.test(inputTag.value)){
        showAlertMessage(messageTag,'Please enter a valid password');
        isValidPassword = false;
    }else{
        hiddenAlertMessage(messageTag);
        isValidPassword = true;
    }
}