let deleteId;

const handleDelete = () => {
    displayLoading();
    deleteUser(deleteId)
    .then(() => {
        closeModal('#delete-modal');

        if(res.status === SUCCESS_STATUS.NO_CONTENT){
            showAlert('There are no changes');
            return;
        }
        
        loadAndDisplayData();
    })
    .catch(handleErrorResponse)
    .finally(() => {
        loadAndDisplayData();
        hideLoading();
    })
}

window.addEventListener('load', () => checkDeleteBtn.addEventListener("click", () => debounce(handleDelete)))

