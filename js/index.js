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

const checkUpdateBtn = document.querySelector('.check-update-btn');

const addUsernameMessage = document.querySelector('.add-username-message');
const addEmailMessage = document.querySelector('.add-email-message');
const addTelephoneMessage = document.querySelector('.add-telephone-message');
const addPasswordMessage = document.querySelector('.add-password-message');

const editTelephoneMessage = document.querySelector('.edit-telephone-message');
const editPasswordMessage = document.querySelector('.edit-password-message');

let isValidForm = false;

let isValidEmail = false;
let isValidUserName = false;
let isValidTelephone = false;
let isValidPassword = false; 



///////////////////////////////// debounce /////////////////////////////////
let debounceTimer;

const debounce = (func) => {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        func();
    }, 300);
}



///////////////////////////////// delete /////////////////////////////////
const checkDeleteBtn = document.querySelector('.check-delete-btn');

const handleDelete = (e, user) => {
    axios.post('http://localhost:3000/deleteUser', {id: user.id})
    .then(
        console.log("success")
    ).catch(console.error)
}
checkDeleteBtn.addEventListener("click",  () => debounce(handleDelete));




///////////////////////////////// password view / hidden /////////////////////////////////
const addPw = document.querySelector('.add-pw');
const editPw = document.querySelector('.edit-pw');
let isPasswordVisible = false; 

const handleAddPasswordView = () => {
    isPasswordVisible = !isPasswordVisible
    addPw.src = `images/pw_${isPasswordVisible ? "on" : "off"}.png`

    addPassword.type=`${isPasswordVisible ? "text" : "password"}`;
}

const handleEditPasswordView = () => {
    isPasswordVisible = !isPasswordVisible
    editPw.src = `images/pw_${isPasswordVisible ? "on" : "off"}.png`

    editPassword.type=`${isPasswordVisible ? "text" : "password"}`;
}

const resetEditPassword = () => {
    isPasswordVisible = false
    editPw.src = `images/pw_off.png`
    editPassword.type=`password`;
}

/* TODO : add팝업 onclick에 달아주기 */
const resetAddPassword = () => {
    isPasswordVisible = false
    addPw.src = `images/pw_off.png`
    addPassword.type=`password`;
}

addPw.addEventListener('click', handleAddPasswordView);
editPw.addEventListener('click', handleEditPasswordView);
