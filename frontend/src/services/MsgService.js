const BASE_URL = "http://127.0.0.1:3000";


var socket;
const msgs  = [];
const status = {
    txt: ''
}

function init() {
    console.log('Creating Socket');
    
    socket = io.connect(BASE_URL);
    socket.on('chat message', function(msg){
        msgs.push(msg)
    });
    socket.on('chat setStatusTxt', function(statusTxt){
        status.txt = statusTxt;
    });
}
function destroy() {
    socket = null;
    console.log('Destroyed Socket');
}

function sendMsg(msg) {
    socket.emit('chat newMessage', msg);
    console.log('Sending: ', msg.txt);
}

function setTopic(topic) {
    socket.emit('chat setTopic', topic);
}
function sendStatus(statusTxt) {
    socket.emit('chat sendStatus', statusTxt);
}

export default {
    init,
    destroy,
    sendMsg,
    setTopic,
    sendStatus,
    msgs,
    status
}