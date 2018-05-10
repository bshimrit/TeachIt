// import carService from '../services/car.service.js'

export default ({
    strict: true,
    state: {
      newMsgsCounter: {},
      totMsgs: 0,
      chatWith: null
    },
    mutations: {
        recievedMsg(state, {msg}){
            // var newMsg = state.newMsgsCounter
            console.log('state.newMsgsCounter:', state.newMsgsCounter);
            console.log('msg.senderId:', msg.senderId);
            
            if (!state.chatWith) {
                (state.newMsgsCounter[msg.senderId])? state.newMsgsCounter[msg.senderId].new++ :
                state.newMsgsCounter[msg.senderId] = {new: 1};
                
                state.newMsgsCounter[msg.senderId].userName = msg.senderName
            }
            state.newMsgsCounter = {...state.newMsgsCounter}
            state.totMsgs++
        },
        removeNewMsgs(state, {recipient}) {
            // state.totMsgs -= state.newMsgsCounter[recipient].new
            delete state.newMsgsCounter[recipient]
            state.newMsgsCounter = {...state.newMsgsCounter}
        },
        chatWith(state, {userId}) {
            state.chatWith = userId
        },
        removeUser(state) {
            state.chatWith = null;
        }
    },
    getters: {
        alerts(state) { 
            return state.newMsgsCounter
        },
        alertsNum(state) {
            return state.totMsgs
        },
        chatWith(state) {
            return state.chatWith
        }
    },
    actions: {
        recievedMsg(store, {msg}){
            console.log('senderId',msg.senderId, 'loggedUser', store.getters.loggedUser._id);
            if (msg.senderId && msg.senderId !== store.getters.loggedUser._id) {
                
                store.commit({type: 'recievedMsg', msg})
            }
        }
    }
  })
  