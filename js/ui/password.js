let isPasswordVisible = false; 

const handleAddPasswordView = () => {
    isPasswordVisible = !isPasswordVisible
    addPw.src = `images/pw_${isPasswordVisible ? "on" : "off"}.png`
    addPassword.type=`${isPasswordVisible ? "text" : "password"}`;
}

const resetAddPassword = () => {
    isPasswordVisible = false
    addPw.src = `images/pw_off.png`
    addPassword.type=`password`;
}
