import UserService from '../services/UserService.js'

export default {
  strict: true,
  state: {
    loggedinUser: null,
    // userFilter: '',
  },
  mutations: {
    setUser(state, {user}) {
        state.loggedinUser = user
    }
    // setUserFilter(state, { filter }) {
    //   state.userFilter = filter;
    // },
    // deleteUser(state, { userId }) {
    //   state.users = state.users.filter(user => user.id !== userId)
    // },
    // setSelecteduser(state, { user }) {
    //   state.selecteduser = user;
    // },
    // adduser(state, { user }) {
    //   state.users = [user, ...state.users];
    // },
    // updateuser(state, { user }) {
    //   const userIdx = state.users.findIndex(curruser => curruser.id === user.id)
    //   state.users.splice(userIdx, 1, user)
    // },
    // setusers(state, {users}) {
    //   state.users = users;
    // }
  },
  getters: {
    // usersForDisplay(state) {
    //   return state.users;
    // },

  },
  actions: {
      checkLogin(store, {credentials}) {
        return UserService.checkLogin(credentials)
            .then(user => {
                store.commit({type: 'setUser', user})
            })
      }
    // loadusers(store) {
    //   return userService.getusers(store.state.userFilter)
    //   .then(users => {
    //       store.commit({ type: 'setusers', users });
    //   })
    // },
    // loaduser(store, {userId}) {
    //   return userService.getById(userId)
    //   .then(user => {
    //     store.commit({type: 'setSelecteduser', user});
    //     return user;
    //   })
    // },
    // deleteuser(store, {userId}) {
    //   return userService.deleteuser(userId)
    //   .then(()=>{
    //     store.commit({type: 'deleteuser', userId});
    //   })
    // },
    // saveuser(store, {user}) {
    //   const isEdit = !!user.id;
    //   return userService.saveuser(user)
    //   .then(user => {
    //     if (isEdit) store.commit({type: 'updateuser', user})
    //     else store.commit({type: 'adduser', user})
    //     return user;
    //   })
    // },
    // getuserById(store, {userId}) {
    //       return userService.getuserById(userId)
    //         .then(user => {
    //           return user;
    //     })   
    // },
  }
}
