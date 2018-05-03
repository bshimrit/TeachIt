const BASE_URL ='';

function login(user) {

 

  return axios
    .post(`${BASE_URL}/login`, user)
    .then(res => {
      sessionStorage.user = JSON.stringify(res.data.user)
      return res.data.user
    })
    .catch(err => {throw new Error('Login Failed')})
}

function register(user) {
  return axios
    .post(`${BASE_URL}/register`, user)
    .then(res => console.log(res.data))
    .catch(err => {throw new Error('Register Failed')})
}

function logout() {
  return axios
    .post(`${BASE_URL}/logout`)
    .then(res => {
      delete sessionStorage.user;
    })
    .catch(err => {throw new Error('Logout Failed')})
}

export default {
  login,
  register,
  logout
};
