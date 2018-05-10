var socketIo = require('socket.io');
var ChatService = require('./ChatService.js');

var connectedCount = 0;
var allSockets = [];
var rooms = [];
function init(http) {
  const io = socketIo(http);
  io.on('connection', socket => {
    console.log('a user connected');    
    connectedCount++;
    allSockets.push(socket);

    socket.on('chatRequest', data => {
      socket.join(data.roomId)
      io.to(data.roomId).emit('chat message',{txt: 'new user connetec to room'});    
      console.log('sending alert:', data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      connectedCount--;
      allSockets.splice(allSockets.findIndex(s => s === socket), 1);
    });
    
    socket.on('chat newMessage', data => {
        console.log('socketId')
        pcl(data)
        console.log('socketRooms' )
        pcl(socket.adapter.rooms)
        io.to(data.roomId).emit('chat message', data);  
        io.emit('alert user', data)
    });

    // socket.on('chat setTopic', topic => {
    //   console.log('Server setting the TOPIC', topic);
    //   if (socket.theTopic) socket.leave(socket.theTopic);
    //   socket.join(topic);
    //   socket.theTopic = topic;

    //   console.log('Connected Count', connectedCount, allSockets.length);
    // });

    socket.on('chat sendStatus', statusTxt => {
      console.log('Server sending  the STATUS', statusTxt);
      io.emit('chat setStatusTxt', statusTxt);
    });
  });
}

module.exports = {
  init
};

var pcl = x => console.log(JSON.stringify(x,null,2))
// io.on('connection', socket => {
//     console.log('a user connected');
//     connectedCount++;
//     allSockets.push(socket)

//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//       connectedCount--;
//       allSockets.splice(allSockets.findIndex(s => s === socket), 1)
//     });

//     socket.on('chat newMessage', msg => {
//       console.log('message: ', msg);
//       if (socket.theTopic) {
//         console.log('Sending msg to all members in topic: ', socket.theTopic);
//         io.to(socket.theTopic).emit('chat message', msg);
//       } else {
//         io.emit('chat message', msg);
//       }
//     });

//     socket.on('chat setTopic', topic => {
//       console.log('Server setting the TOPIC', topic);
//       if (socket.theTopic) socket.leave(socket.theTopic);
//       socket.join(topic);
//       socket.theTopic = topic;

//       console.log('Connected Count', connectedCount, allSockets.length);
//     })

//     socket.on('chat sendStatus', statusTxt => {
//       console.log('Server sending  the STATUS', statusTxt);
//       socket.broadcast.emit('chat setStatusTxt', statusTxt);
//     })

//   });
