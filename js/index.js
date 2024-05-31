const fetchData = async() => {
    const params = {
        sortColumn: 'id',
        sortOrder: 'asc',
        pageSize: 50,
        currentPage: 1
    }
    return axios.get("../test.json")
    // return axios.get("http://192.168.1.51:5281/users?sortColumn=id&sortOrder=asc&pageSize=30&currentPage=1")
    .then((response) => {
        // console.log(response);
        return response.data;
    })
}

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

const spaceRegex = /\s/;
const nameRegex = /^[가-힣]+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
// const phoneRegex = /^(01[016789]-?\d{3,4}-?\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/; // 핸드폰, 지역번호 모두 허용 
// const phoneRegex = /^01[016789]\d{3,4}\d{4}$/; // 핸드폰만, 하이픈없이 
const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/; // 핸드폰만 하이픈 허용 
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,16}$/;


///////////////////////////////// validation /////////////////////////////////
const checkNameValidation = (inputTag, messageTag) => {
    if(inputTag.value.trim() === ''){
        messageTag.textContent = 'Please enter a name';
        messageTag.classList.remove('hidden');
        isValidUserName = false;
    }else if(!nameRegex.test(inputTag.value)){
        messageTag.textContent = 'Please enter a valid name';
        messageTag.classList.remove('hidden');
        isValidUserName = false;
    }else{
        messageTag.textContent = '';
        messageTag.classList.add('hidden');
        isValidUserName = true;
    }
}

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

///////////////////////////////// debounce /////////////////////////////////
let debounceTimer;

const debounce = (func) => {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        func();
    }, 300);
}

///////////////////////////////// update /////////////////////////////////
const populateEditModal = (e, user) => {
    editUsername.value = user.name;
    editEmail.value = user.email;
    editTelephone.value = user.phone;
    editRole.value =  user.role;
    editPassword.value = user.password;
    editId.value = user.id;
}

editTelephone.addEventListener('blur', () => checkPhoneValidation(editTelephone, editTelephoneMessage));
editPassword.addEventListener('blur', () => checkPasswordValidation(editPassword, editPasswordMessage));

const handleUpdate = () => {
    if(isValidTelephone && isValidPassword){
        isValidForm = true;
    }

    if(!isValidForm){
        return;
    }

    const params = {
        id: editId.value,
        name: editUsername.value,
        email: editEmail.value,
        phone: editTelephone.value,
        role: editRole.value,
        password: editPassword.value,
    }

    axios.post('http://localhost:3000/updateUser', params)
    .then((response) => {
        console.log("success update");
    }).catch(console.error)
}

checkUpdateBtn.addEventListener('click', () => debounce(handleUpdate));

///////////////////////////////// delete /////////////////////////////////
const checkDeleteBtn = document.querySelector('.check-delete-btn');

const handleDelete = (e, user) => {
    axios.post('http://localhost:3000/deleteUser', {id: user.id})
    .then(
        console.log("success")
    ).catch(console.error)
}
checkDeleteBtn.addEventListener("click",  () => debounce(handleDelete));

///////////////////////////////// make table /////////////////////////////////
const populateTable = async () => {
    const data = await fetchData();
    if (!data) return;

    data.users.forEach(user => {
        const row = document.createElement('tr');

        const seqCell = document.createElement('td');
        seqCell.textContent = user.id;
        row.appendChild(seqCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const userNameCell = document.createElement('td');
        userNameCell.textContent = user.name;
        row.appendChild(userNameCell);

        const telephoneCell = document.createElement('td');
        telephoneCell.textContent = user.phone;
        row.appendChild(telephoneCell);

        const roleCell = document.createElement('td');
        roleCell.textContent = user.role;
        row.appendChild(roleCell);

        // Edit button cell
        const editCell = document.createElement('td');
        const editBtn = document.createElement('img');
        editBtn.className = 'edit-btn';
        editBtn.src = 'images/icon_Edit_basic.png';
        editBtn.alt = 'edit btn';
        editBtn.setAttribute('data-bs-toggle', 'modal');
        editBtn.setAttribute('data-bs-target', '#edit-modal');
        editBtn.addEventListener("click", (e) => populateEditModal(e, user))
        editCell.appendChild(editBtn);
        row.appendChild(editCell);

        // Delete button cell
        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('img');
        deleteBtn.className = 'delete-btn';
        deleteBtn.src = 'images/icon_Delete_basic.png';
        deleteBtn.alt = 'delete btn';
        deleteBtn.setAttribute('data-bs-toggle', 'modal');
        deleteBtn.setAttribute('data-bs-target', '#delete-modal');
        deleteBtn.addEventListener("click", (e) => handleDelete(e, user))
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    })
};

populateTable();


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

///////////////////////////////// pagination /////////////////////////////////
let currentPage = 1;
let totalPage;
let totalCount;
let pagePerView = 50;

// << 누르면 1 page 
// >> 누르면 totalPage 


totalPage = Math.ceil(50 / totalCount); 


///////////////////////////////// cancel /////////////////////////////////

const cancelModal = () => {
    // addUsername.value = '';
    // addEmail.value = '';
    // addTelephone.value = '';
    // addRole.value = '';
    // addPassword.value = '';
}

const cancelBtn = document.querySelector('.cancel-btn');
cancelBtn.addEventListener("click", cancelModal);




// TODO : 수정에도 같은 버튼으로 처리해놨음!! 그래서 querySelector'All'써야함
// document.querySelectorAll('.password-on').forEach(button => {
//     button.addEventListener

const passwordOn = document.querySelector('.password-on');
const passwordOff = document.querySelector('.password-off');
let isPasswordVisible = false; 

const handlePasswordView = () => {
    isPasswordVisible = !isPasswordVisible
    if(isPasswordVisible){
        passwordOn.classList.remove('hidden');
        passwordOff.classList.add('hidden');
        addPassword.type='text';
    }else{
        passwordOn.classList.add('hidden');
        passwordOff.classList.remove('hidden');
        addPassword.type='password';
    }
}

passwordOff.addEventListener('click', handlePasswordView);
passwordOn.addEventListener('click', handlePasswordView);


// document.querySelectorAll('.password-on, .password-off').forEach(button => {
//     button.addEventListener('click', function() {
//         const targetId = button.getAttribute('data-target');
//         const passwordField = document.querySelector(targetId);
//         const isPasswordVisible = passwordField.type === 'password';
        
//         if (isPasswordVisible) {
//             passwordField.type = 'text';
//             document.querySelector(`button.password-on[data-target="${targetId}"]`).classList.remove('hidden');
//             document.querySelector(`button.password-off[data-target="${targetId}"]`).classList.add('hidden');
//         } else {
//             passwordField.type = 'password';
//             document.querySelector(`button.password-on[data-target="${targetId}"]`).classList.add('hidden');
//             document.querySelector(`button.password-off[data-target="${targetId}"]`).classList.remove('hidden');
//         }
//     });
// });