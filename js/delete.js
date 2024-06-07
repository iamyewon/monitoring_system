let deleteId;

const handleDelete = () => {
    displayLoading();
    axios.delete(`http://192.168.1.51:5281/users/${deleteId}`)
    .then(async() => {
        closeModal('#delete-modal');
        populateTable(await fetchData());
    })
    .catch(console.error)
    .finally(hideLoading)
}

// TODO : 함수 하나로 add, edit, delete, ... 
