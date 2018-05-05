import UserService from '../services/UserService.js'

export default {
  strict: true,
  state: {
    loggedinUser: null,
    users:[],
    dropdown: false
    // userFilter: '',
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
    closeDrowpdown(state) {
        state.dropdown = false
    },
    
    // setUserFilter(state, { filter }) {
    //   state.userFilter = filter;
    // },
    // deleteUser(state, { userId }) {
    //   state.users = state.users.filter(user => user.id !== userId)
    // },
    // setSelecteduser(state, { user }) {
    //   state.selecteduser = user;
    // },
    addUser(state, { user }) {
      console.log('Mut',user);
      
      state.users = [user, ...state.users];
    },
    updateUser(state, { user }) {
      const userIdx = state.users.findIndex(curruser => curruser.id === user.id)
      state.users.splice(userIdx, 1, user)
    },
    // setusers(state, {users}) {
    //   state.users = users;
    // }
  },
  getters: {
      loggedUser(state) {
          return state.loggedinUser
      },
      dropdown(state) {
          return state.dropdown
      }
    // usersForDisplay(state) {
    //   return state.users;
    // },

  },
  actions: {
      checkLogin(store, {creds}) {
        return UserService.checkLogin(creds)
            .then(user => {
                store.commit({type: 'setUser', user})
            })
      },
    // loadusers(store) {
    //   return userService.getusers(store.state.userFilter)
    //   .then(users => {
    //       store.commit({ type: 'setusers', users });
    //   })
    // },
    loadUser(store, {userId}) {
      return UserService.getUserById(userId)
      .then(user => {
        store.commit({type: 'setUser', user});
        return user;
      })
    },
    // deleteuser(store, {userId}) {
    //   return userService.deleteuser(userId)
    //   .then(()=>{
    //     store.commit({type: 'deleteuser', userId});
    //   })
    // },
    saveUser(store, {user}) {
      
      const isEdit = !!user.id;
      return UserService.saveUser(user)
      .then(res => {
        let retUser = res.data[0];
        console.log('resUser:', retUser);
        if (isEdit) store.commit({type: 'updateUser', retUser})
        else store.commit({type: 'addUser', retUser})
        return retUser;
      })
    },
    // getuserById(store, {userId}) {
    //       return userService.getuserById(userId)
    //         .then(user => {
    //           return user;
    //     })   
    // },
  }
}
