// import carService from '../services/car.service.js'

export default ({
    strict: true,
    state: {
      newMsgsCounter: {},
      totMsgs: 0,
      chatWith: null,
      onChatPage: false,
      isNewChat: false
    },
    mutations: {
        recievedMsg(state, {msg}){
            // var newMsg = state.newMsgsCounter
                if (!state.chatWith) {
                (state.newMsgsCounter[msg.senderId])? state.newMsgsCounter[msg.senderId].new++ :
                state.newMsgsCounter[msg.senderId] = {new: 1};
                
                state.newMsgsCounter[msg.senderId].userName = msg.senderName
                state.totMsgs++
            }
            state.newMsgsCounter = {...state.newMsgsCounter}
        },
        removeNewMsgs(state, {recipient}) {
            if (state.totMsgs) state.totMsgs -= state.newMsgsCounter[recipient].new
            
            delete state.newMsgsCounter[recipient]
            state.newMsgsCounter = {...state.newMsgsCounter}
        },
        chatWith(state, {userId}) {
            state.chatWith = userId;
            // delete state.newMsgsCounter[userId]
        },
        removeUser(state) {
            state.chatWith = null;
        },
        onChatPage(state, {onPage}) {
            state.onChatPage = onPage
        },
        startNewChat(state, {details}) {
            state.isNewChat = true;
            state.chatWith = details.recipientId
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
        },
        isChatPage(state) {
            return state.onChatPage
        },
        newMsg(state) {
            return {
                txt: '',
                senderId: '',
                senderName:'',
                recipientId: '',
                roomId: ''
            }
        },
        startNewChat(state) {
            return {isNewChat: state.isNewChat, recipientId: state.chatWith}
        }
    },
    actions: {
        recievedMsg(store, {msg}){
            if (msg.senderId && msg.senderId !== store.getters.loggedUser._id) {
                store.commit({type: 'recievedMsg', msg})
            }
        }
    }
  })
  