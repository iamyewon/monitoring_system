const addBtnMark = document.querySelector('.add-btn-mark');
const addBtnText = document.querySelector('.add-btn-text');

const theadRow = document.querySelector('.thead-row');
const tableBody = document.querySelector('.table-body');

const addUsername = document.querySelector('#add-username');
const addEmail = document.querySelector('#add-email');
const addTelephone = document.querySelector('#add-telephone');
const addRole = document.querySelector('#add-role');
const addPassword = document.querySelector('#add-password');

const editUsername = document.querySelector('#edit-username');
const editEmail = document.querySelector('#edit-email');
const editTelephone = document.querySelector('#edit-telephone');
const editRole = document.querySelector('#edit-role');
const editPassword = document.querySelector('#edit-password');
const editId = document.querySelector('#edit-id');

const addUsernameMessage = document.querySelector('.add-username-message');
const addEmailMessage = document.querySelector('.add-email-message');
const addTelephoneMessage = document.querySelector('.add-telephone-message');
const addPasswordMessage = document.querySelector('.add-password-message');

const editTelephoneMessage = document.querySelector('.edit-telephone-message');
const editPasswordMessage = document.querySelector('.edit-password-message');

const checkUpdateBtn = document.querySelector('.check-update-btn');
const checkDeleteBtn = document.querySelector('.check-delete-btn');
const addBtn = document.querySelector('.add-btn');
const addPw = document.querySelector('.add-pw');
const editPw = document.querySelector('.edit-pw');

const itemsPerView = document.querySelector('.items-per-view');
const PaginationLists = document.querySelector('.pagination-lists');
const firstBtn = document.querySelector('.first-btn');
const prevBtn = document.querySelector('.prev-btn');
const lastBtn = document.querySelector('.last-btn');
const nextBtn = document.querySelector('.next-btn');

const loadingBackground = document.querySelector('.loading-background');

let isValidEmail = false;
let isValidUserName = false;
let isValidTelephone = false;
let isValidPassword = false; 

let isLoading = false;

window.onload = () => {

    // 문맥 상 취소를 할 때 초기화하는게 맞음 
    // 빈화면-> 취소 막기 
    addBtnMark.addEventListener('click', resetModal);
    addBtnText.addEventListener('click', resetModal);

    // TODO : modal로 -> 옮기니까 안되는뎅? 
    addPw.addEventListener('click', handleAddPasswordView);
    addEmail.addEventListener('blur', () => checkEmailValidation(addEmail, addEmailMessage));
    addTelephone.addEventListener('blur', () => checkPhoneValidation(addTelephone, addTelephoneMessage));
    addPassword.addEventListener('blur', () => checkPasswordValidation(addPassword, addPasswordMessage));
    addBtn.addEventListener("click", clickAddBtn);

    checkDeleteBtn.addEventListener("click",  () => {
        debounceTimer && clearTimeout(debounceTimer);
        debounce(handleDelete)
    });

    editTelephone.addEventListener('blur', () => checkPhoneValidation(editTelephone, editTelephoneMessage));
    checkUpdateBtn.addEventListener('click', () => checkPhoneValidation(editTelephone, editTelephoneMessage));

    checkUpdateBtn.addEventListener('click', () => {
        debounceTimer && clearTimeout(debounceTimer);
        debounce(handleUpdate);
    });
   
    theadRow.addEventListener("click", sortAndLoadData);
    itemsPerView.addEventListener("change", updatePageSizeAndLoadData);

    // TODO : 개발자 의도에 맞게 핵심이 되는 함수는 index에서 
    loadAndDisplayData();
}