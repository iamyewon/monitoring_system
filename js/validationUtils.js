
const spaceRegex = /\s/;
// const nameRegex =  /^[가-힣]{2,5}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
// const phoneRegex = /^(01[016789]-?\d{3,4}-?\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/; // 핸드폰, 지역번호 모두 허용 
const phoneRegex = /^010-?\d{4}-?\d{4}$/; // 하이픈 허용 
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,16}$/;


///////////////////////////////// validation /////////////////////////////////
// const checkNameValidation = (inputTag, messageTag) => {
//     if(inputTag.value.trim() === ''){
//         messageTag.textContent = 'Please enter a name';
//         messageTag.classList.remove('hidden');
//         isValidUserName = false;
//     }else if(!nameRegex.test(inputTag.value)){
//         messageTag.textContent = 'Please enter a valid name';
//         messageTag.classList.remove('hidden');
//         isValidUserName = false;
//     }else{
//         messageTag.textContent = '';
//         messageTag.classList.add('hidden');
//         isValidUserName = true;
//     }
// }

const checkEmailValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        messageTag.textContent = 'Please enter a email';
        messageTag.classList.remove('hidden');
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