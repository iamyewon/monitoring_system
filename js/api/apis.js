/** 사용자 리스트 조회 */
const findUsers = (params) => {
    return axios.get(API_URL.USERS, {params})
}

const deleteUser = (deleteId) => {
    return axios.delete(`${API_URL}/${deleteId}`)
}

const updateUser = (params) => {
    return axios.put(API_URL.USERS, {params})
}

const createUser = (params) => {
    return axios.post(API_URL.USERS, {params})
}

/*
const callApiUsers = (type, params) => {
    switch(type) {
        case 'find':
            findUsers(params)
        case 'delete':
            deleteUser()   
    }
}

callApiUsers('find', params);
callApiUsers('delete') 
*/