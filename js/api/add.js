
/**
 * 유저를 추가하는 모달에서 SAVE(추가하기) 버튼을 눌렀을 때 호출되는 함수 
 * @author 웹팀 김예원 2024-06-14
 * @returns {Promise}
 * @description createUser(유저 추가 API)호출, 성공시 페이지 재조회
 */
const addUser = () => {  
    if(!isValidEmail || !isValidTelephone || !isValidPassword){
        return
    }

    displayLoading();

    const params = {
        name: addUsername.value !== '' ? addUsername.value : null,
        email: addEmail.value,
        email: '',
        phone: addTelephone.value,
        role: addRole.value,
        password: CryptoJS.SHA256(addPassword.value).toString()
    }
    
    createUser(params)
    .then(() => {
        closeModal('#add-modal');
        loadAndDisplayData();
    })
    .catch(handleErrorResponse)
    .finally(() => {
        loadAndDisplayData();
        hideLoading();
    })
}

/**
 * 유저를 추가하는 모달에서 SAVE(추가하기) 버튼을 눌렀을 때 호출되는 함수 
 * @author 웹팀 김예원 2024-06-14
 * @description validation 검증 후 addUser 함수 호출
 */
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
    addBtn.addEventListener("click", () => {
        clickAddBtn();
    });
});
