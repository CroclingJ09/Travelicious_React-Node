import axios from "axios";

const API_URL = '/api/users' //route vers notre api (backend) (server.js)

//Get all users
const getAllUsers = async () => {
    const response = await axios(API_URL + '/all')
    return response.data
}

//Get user data
const getUser = async (id) => {
    const response = await axios(API_URL + '/user' + id)
    return response.data
}

//Update user data
const updateUser = async (userData) => {
    const response = await axios.put(API_URL + "/updateUser" + userData.id, userData)
    return response.data
}

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "/register", userData)

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data

}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + '/login', userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Logout user
const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    getAllUsers,
    getUser,
    updateUser,
    register,
    logout,
    login
}

export default authService