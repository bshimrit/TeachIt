// import carService from '../services/car.service.js'

export default ({
    strict: true,
    state: {
      newMsgsCounter: 0,
    },
    mutations: {
        recievedMsg(state, {msg}){
            state.newMsgsCounter++
        }
    },
    getters: {
        alerts(state) {
            console.log('alerts:',state.newMsgsCounter);
            return state.newMsgsCounter
        }
    },
    actions: {
        recievedMsg(store, {msg}){
            if (msg.senderId && msg.senderId !== store.getters.loggedUser._id) {
                store.commit({type: 'recievedMsg'})
            }
        }
    }
  })
  