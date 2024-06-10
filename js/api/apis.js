const findUsers = (params) => {
    return axios.get(API_URL.USERS, {params})
}

const deleteUser = (deleteId) => {
    return axios.delete(`${API_URL.USERS}/${deleteId}`)
}

const updateUser = (params) => {
    return axios.put(API_URL.USERS, params)
}

const createUser = (params) => {
    return axios.post(API_URL.USERS, params)
}
