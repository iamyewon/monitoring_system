const fetchData = () => {
    const params = {
        sortColumn,
        sortOrder,
        pageSize,
        currentPage
    }

    return findUsers(params)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            const { code } = error.response.data;
            switch(code){
                case ERROR_CODE.EC1006: 
                    alert('[error] An error occurred. Please try again.');
                    break;
                case ERROR_CODE.EC1007: 
                    alert('[error] An error occurred. Please try again.');
                    break;
                default: 
                    alert('[error] An unknown error occurred.');
            }
        }
    })
    .finally(hideLoading)
}

const populateTable = (data) => {
    tableBody.innerHTML = '';

    data.users.forEach(user => {
        const row = document.createElement('tr');

        const seqCell = document.createElement('td');
        seqCell.textContent = user.seq;
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
        editBtn.addEventListener("click", () => populateEditModal(user))
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
        deleteBtn.addEventListener("click", () => deleteId = user.id)
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    })
};

const loadAndDisplayData = async() => {
    const data = await fetchData();
    if (!data) return;
    populatePagination(data);
    populateTable(data);
}


const sortAndLoadData = (e) => {
    displayLoading();
    debounce(() => {
        sortColumn = e.target.id;
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    
        if(sortColumn === ''){
            return;
        }
    
        loadAndDisplayData();
    })
}

const updatePageSizeAndLoadData = (e) => {
    displayLoading();
    debounce(async() => {
        pageSize = Number(e.target.value);
        currentPage = 1;

        loadAndDisplayData();
    });
}

// TODO : 디바운싱 적용 
window.addEventListener('load', () => {
    document.querySelector('.title').addEventListener('click', () => {
        fetchData()
            .then((res) => {
                populateTable(res);
            })
            .catch(() => {
                console.error;
            });
    });
})
