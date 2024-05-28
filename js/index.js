const fetchData = async() => {
    // return axios.get("../test.json")
    const params = {
        sortColumn: 'id',
        sortOrder: 'asc',
        pageSize: 50,
        currentPage: 1
    }
    // return axios.get("http://192.168.1.51:7278/api/User", params)
    return axios.get("http://192.168.1.51:5281/api/User?sortColumn=id&sortOrder=asc&pageSize=30&currentPage=1")
    .then((response) => {
        console.log(response);
        return response.data;
    })
}

const tableBody = document.querySelector('.table-body');


const handleModify = (e, user) => {
    const editUsername = document.querySelector('#edit-username');
    const editEmail = document.querySelector('#edit-email');
    const editTelephone = document.querySelector('#edit-telephone');
    const editRole = document.querySelector('#edit-role');
    const editPassword = document.querySelector('#edit-password');

    editUsername.value = user.name;
    editEmail.value = user.email;
    editTelephone.value = user.phone;
    editRole.value =  user.role;
    editPassword.value = user.password;
    // console.log(user);
}

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
        editBtn.addEventListener("click", (e) => handleModify(e, user))
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
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    })
};

populateTable();


document.addEventListener("DOMContentLoaded", () => {
    const addUsername = document.querySelector('#add-username');
    const addEmail = document.querySelector('#add-email');
    const addTelephone = document.querySelector('#add-telephone');
    const addRole = document.querySelector('#add-role');
    const addPassword = document.querySelector('#add-password');
    const usernameMessage = document.querySelector('username-message');
    const emailMessage = document.querySelector('.email-message');
    const telephoneMessage = document.querySelector('.telephone-message');
    const passwordMessage = document.querySelector('.password-message');
})

let isValid = false;

///////////////////////////////// add /////////////////////////////////
const checkFormValid = () => {
    console.log(addUsername.value.trim());
    if(addUsername.value.trim() === ''){
        console.log("Fff");
        usernameMessage.textContent = 'Please enter a name';
        isValid = false;
    }
    //else if(addEmail.value.trim() === ''){
    //     emailMessage.textContent = 'Please enter a email';
    //     // isValid = false;
    // }else if(addTelephone.value.trim() === ''){
    //     telephoneMessage.textContent = 'Please enter a telephone';
    //     // isValid = false;
    // }else if(addPassword.value.trim() === ''){
    //     passwordMessage.textContent = 'Please enter a password';
    //     // isValid = false;
    // }
    
}

const addUser = () => {
    checkFormValid();
    
    if(!isValid){
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
        console.log('ff')
    ).catch(console.error)
}


const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener("click", addUser); 



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

const deleteUser = () => {
    console.log("click");
    
    axios.post('http://localhost:3000/deleteUser', {seq: '1'})
    .then(
        console.log("success")
    ).catch(console.error)
}

checkDeleteBtn.addEventListener("click",  () => debounce(deleteUser));

///////////////////////////////// update /////////////////////////////////
const checkUpdateBtn = document.querySelector('.check-update-btn');
checkUpdateBtn.addEventListener('click', () => debounce(updateUser));



///////////////////////////////// pagination /////////////////////////////////
let currentPage = 1;
let totalPage;
let totalCount;
let pagePerView = 50;

// << 누르면 1 page 
// >> 누르면 totalPage 


totalPage = Math.ceil(50 / totalCount); 

