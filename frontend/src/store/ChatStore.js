// import carService from '../services/car.service.js'

export default ({
    strict: true,
    state: {
      newMsgsCounter: {},
    },
    mutations: {
    },
    getters: {
        alerts(state) {
            return state.newMsgsCounter
        }
    },
    actions: {
        recievedMsg(store, {msg}){
            // var sender = store.dispatch({type: 'getUserById', userId: msg.senderId})
            // .then(sender => {
                if (msg.senderId && msg.senderId !== store.getters.loggedUser._id) {
                    var newMsg = store.state.newMsgsCounter
                    console.log('msgs before change',newMsg);
                    
                    (newMsg[msg.senderId])? newMsg[msg.senderId]++ : newMsg[msg.senderId] = 1;
                    console.log('msgs after change',newMsg);

                }
            // })
        }
    }
  })
  