import axios from "axios";

const USER_URL = "http://localhost:3000/user";
const BASE_URL = "";

function login(user) {
  return axios
    .post(`${BASE_URL}/login`, user)
    .then(res => {
      sessionStorage.user = JSON.stringify(res.data.user);
      return res.data.user;
    })
    .catch(err => {
      throw new Error("Login Failed");
    });
}

function checkLogin(creds) {
  return new Promise((resolve, reject) => {
    getUsers().then(users => {   //** Has to be done in backend - password shouldn't appear in front! */
      const user = users.find(
        user =>
          user.userName === creds.userName && user.password === creds.password
      );
      if (user) {
            sessionStorage.user = JSON.stringify(user);
            resolve(user)
        }
      else reject("wrong credentials");
    });
  });
}

function register(user) {
  console.log('hifgf');
  // return axios
  //   .post(`${BASE_URL}/register`, user)
  //   .then(res => console.log(res.data))
  //   .catch(err => {
  //     throw new Error("Register Failed");
  //   });
}

function logout() {
  return axios
    .post(`${BASE_URL}/logout`)
    .then(res => {
      delete sessionStorage.user;
    })
    .catch(err => {
      throw new Error("Logout Failed");
    });
}

function emptyUser() {
  return {
    username: "",
    password: "",
    isTeacher: false,
    isAdmin: false,
    firstname: "",
    lastname: "",
    desc: "",
    quote: "",
    education: "",
    img: "",
    socialMedia: [],
    topics: []
  };
}

function getUsers() {
  return axios
    .get(USER_URL)
    .then(res => res.data)
    .catch(e => console.log("No Users", e));
}

// function saveUser(user) {
//   if (user._id) return axios.put(_getUserUrl(user._id), user)
//   else return axios.post(USER_URL, user);
// }

function deleteUser(userId) {
  return axios.delete(_getUserUrl(userId));
}

function getUserById(userId) {
  return axios.get(_getUserUrl(userId)).then(res => res.data);
}

function _getUserUrl(userId) {
  return `${USER_URL}/${userId}`;
}

export default {
  login,
  register,
  logout,
  getUsers,
  deleteUser,
  emptyUser,
  getUserById,
  checkLogin
};
