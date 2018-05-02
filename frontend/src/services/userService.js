import axios from "axios";

const USER_URL = 'http://localhost:3000/user';

function emptyUser() {
    return {name: ''}
}

function getUsers() {
    return axios
            .get(USER_URL)
            .then(res => res.data)
            .catch(e => console.log('No Users', e))
}

function saveUser(user) {
    if (user._id) return axios.put(_getUserUrl(user._id), user)
    else return axios.post(USER_URL, user);  
}

function deleteUser(userId) {
    return axios.delete(_getUserUrl(userId))
}


function getUserById(userId) {
   
    return axios
    .get(_getUserUrl(userId))
    .then(res => res.data)
}


function _getUserUrl(userId) {
    return `${USER_URL}/${userId}`;
}

export default {
    getUsers,
    saveUser,
    deleteUser,
    emptyUser,
    getUserById,
}