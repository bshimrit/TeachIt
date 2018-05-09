import UserService from '../services/UserService.js'

export default {
  strict: true,
  state: {
    loggedinUser: null,
    users:[],
    dropdown: false
  },
  mutations: {
    setUser(state, {user}) {
        state.loggedinUser = user;
        state.dropdown = false
    },
    logOut(state) {
        delete sessionStorage.user
        state.loggedinUser = null
    },
    toggleDropdown(state) {
        state.dropdown = !state.dropdown
    },
    closeDropdown(state) {
        state.dropdown = false
    },
    addUser(state, { user }) {   
      state.users = [user, ...state.users];
    },
    updateUser(state, { user }) {
      const userIdx = state.users.findIndex(curruser => curruser.id === user.id)
      state.users.splice(userIdx, 1, user)
    },
  },
  getters: {
      loggedUser(state) {
          return state.loggedinUser
      },
      dropdown(state) {
          return state.dropdown
      },
      onlineUserName(state) {
          if (state.loggedinUser) return state.loggedinUser.fullName
      },
      onlineUserImg(state) {
        if (state.loggedinUser) return state.loggedinUser.img
      }
  },
  actions: {
      checkLogin(store, {creds}) {
          console.log('checking login:', creds);
          
        return UserService.checkLogin(creds)
            .then(user => {
                store.commit({type: 'setUser', user})
            })
      },
    loadUser(store, {userId}) {
      return UserService.getUserById(userId)
      .then(user => {
        store.commit({type: 'setUser', user});
        return user;
      })
    },
    saveUser(store, {user}) {
      const isEdit = !!user._id;
      return UserService.saveUser(user)
      .then(res => {
        let retUser = res.data[0];
        console.log('resUser:', retUser);
        if (isEdit) store.commit({type: 'updateUser', retUser})
        else store.commit({type: 'addUser', user: retUser})
        return retUser;
      })
    },
    getUserById(store, {userId}) {
        console.log('got ID:', userId);
        
          return UserService.getUserById(userId)
            .then(user => {
              return user;
        })   
    },
  }
}
