let deleteId;

const handleDelete = () => {
    displayLoading();
    deleteUser(deleteId)
    .then(() => {
        closeModal('#delete-modal');
        return fetchData();
    })
    .then((res) => {
        populateTable(res)
    })
    .catch((error) => {
        const { code } = error.response.data;
        if(code === ERROR_CODE.EC1005){
            alert('The specified ID does not exist.');
        }
    })
    .finally(hideLoading)
}

window.addEventListener('load', () => {
    checkDeleteBtn.addEventListener("click",  () => debounce(handleDelete));
})
