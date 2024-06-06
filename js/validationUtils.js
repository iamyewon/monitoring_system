
const spaceRegex = /\s/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
// const phoneRegex = /^(01[016789]-?\d{3,4}-?\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/; // 핸드폰, 지역번호 모두 허용 
const phoneRegex = /^010-?\d{4}-?\d{4}$/; // 하이픈 허용 
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,16}$/;

const showAlertMeesage = (messageTag, message) => {
    messageTag.textContent = message;
    messageTag.classList.remove('hidden');

}

// TODO : showAlertMeesage 적용 
const checkEmailValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        showAlertMeesage(messageTag,'Please enter a email');
        isValidEmail = false;
    }else if(!emailRegex.test(inputTag.value)){
        messageTag.textContent = 'Please enter a valid email';
        messageTag.classList.remove('hidden');
        isValidEmail = false;
    }else{
        messageTag.textContent = '';
        messageTag.classList.add('hidden');
        isValidEmail = true;
    }
}

const checkPhoneValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        messageTag.textContent = 'Please enter a phone';
        messageTag.classList.remove('hidden');
        isValidTelephone = false;
    }else if(!phoneRegex.test(inputTag.value)){
        messageTag.textContent = 'Please enter a valid phone';
        messageTag.classList.remove('hidden');
        isValidTelephone = false;
    }else{
        messageTag.textContent = '';
        messageTag.classList.add('hidden');
        isValidTelephone = true;
    }
}

const checkPasswordValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        messageTag.textContent = 'Please enter a password';
        messageTag.classList.remove('hidden');
        isValidPassword = false;
    }else if(!passwordRegex.test(inputTag.value)){
        messageTag.textContent = 'Please enter a valid password';
        messageTag.classList.remove('hidden');
        isValidPassword = false;
    }else{
        messageTag.textContent = '';
        messageTag.classList.add('hidden');
        isValidPassword = true;
    }
}