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
    .catch(console.error)
    .finally(hideLoading)
}

window.addEventListener('load', () => {
    checkDeleteBtn.addEventListener("click",  () => {
        debounceTimer && clearTimeout(debounceTimer);
        debounce(handleDelete)
    });
})
