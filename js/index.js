const fetchData = async() => {
    return axios.get("../test.json")
    .then((response) => {
        // console.log(response);
        return response.data;
    })
}

const tableBody = document.querySelector('.table-body');


handleModify = (e, user) => {
    const editUsername = document.querySelector('#edit-username');
    const editEmail = document.querySelector('#edit-email');
    const editTelephone = document.querySelector('#edit-telephone');
    const editRole = document.querySelector('#edit-role');
    const editPassword = document.querySelector('#edit-password');

    editUsername.value = user.userName;
    editEmail.value = user.email;
    editTelephone.value = user.telephone;
    editRole.value =  user.role;
    editPassword.value = user.password;
    // console.log(user);
}

const populateTable = async () => {
    const data = await fetchData();
    if (!data) return;

    data.userList.forEach(user => {
        const row = document.createElement('tr');

        const seqCell = document.createElement('td');
        seqCell.textContent = user.seq;
        row.appendChild(seqCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = user.email;
        row.appendChild(emailCell);

        const userNameCell = document.createElement('td');
        userNameCell.textContent = user.userName;
        row.appendChild(userNameCell);

        const telephoneCell = document.createElement('td');
        telephoneCell.textContent = user.telephone;
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


const addUsername = document.querySelector('#add-username');
const addEmail = document.querySelector('#add-email');
const addTelephone = document.querySelector('#add-telephone');
const addRole = document.querySelector('#add-role');
const addPassword = document.querySelector('#add-password');

// %%%%%%%%%% add %%%%%%%%%%
const addUser = () => {
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

