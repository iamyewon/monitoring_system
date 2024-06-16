const handleErrorResponse = (error) => {
    if (error.response && error.response.data) {
        const { code } = error.response.data;
        switch(code){
            case ERROR_CODE.EC1001: 
                showAlert('There are unfilled fields.');
                break;
            case ERROR_CODE.EC1002: 
                showAlert('There are fields that do not meet the validation criteria.')
                break;
            case ERROR_CODE.EC1004:
                showAlertMessage(addEmail, addEmailMessage, 'This email already exists.')
                break;
            case ERROR_CODE.EC1005:
                showAlert('The specified ID does not exist.');
                break;
            case ERROR_CODE.EC1006: 
                showAlert('An unknown error occurred. Please try again.');
                break;
            case ERROR_CODE.EC1007: 
                showAlert('An unknown error occurred. Please try again.');
                break;
            default: 
                showAlert('An unknown error occurred. Please try again.')
        }
    }
}
