const express = require("express");
const bodyParser = require("body-parser");
const cors = require("express-cors");
var http = require("http");
// var socket = require("socket.io");
const clientSessions = require("client-sessions");
const SocketService = require('./services/SocketService');
var UserService = require("./services/UserService");

const app = express();
app.use(
  cors({
    allowedOrigins: ["localhost:8080", "127.0.0.1:8080"]
  })
);
app.use(bodyParser());
http = http.Server(app);
// var io = socket(http);
SocketService.init(http)

const addUserRoutes = require("./routes/UserRoute");
addUserRoutes(app);
const addReviewRoutes = require("./routes/ReviewRoute");
addReviewRoutes(app);
const addTopicRoutes = require("./routes/TopicRoute");
addTopicRoutes(app);
const addTeacherTopicRoutes = require("./routes/TeacherTopicRoute");
addTeacherTopicRoutes(app);

// app.listen(3000, () => console.log("Example app listening on port 3000!"));

app.use(express.static("frontend"));
app.use(
  clientSessions({
    cookieName: "session",
    secret: "C0d1ng 1s fun 1f y0u kn0w h0w", // set this to a long random string!
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  })
);
app.get("/baba", (req, res) => {
  res.json(["Osho", "Maharishi", "Sali"]);
});

var connectedCount = 0;
var allSockets = [];

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// io.on("connection", socket => {
//   console.log("a user connected");
//   connectedCount++;
//   allSockets.push(socket);

//   socket.on('chatRequest', data => {
//       console.log({data})
//     //TODO - check if room exists
//         socket.join(data.id+data.otherId)
//   })

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     connectedCount--;
//     allSockets.splice(allSockets.findIndex(s => s === socket), 1);
//   });

//   socket.on("chat newMessage", msg => {
//     console.log("message: ", msg);
//     if (socket.theTopic) {
//       console.log("Sending msg to all members in topic: ", socket.theTopic);
//       io.to(socket.theTopic).emit("chat message", msg);
//     } else {
//       io.emit("chat message", msg);
//     }
//   });

//   socket.on("chat setTopic", topic => {
//     console.log("Server setting the TOPIC", topic);
//     if (socket.theTopic) socket.leave(socket.theTopic);
//     socket.join(topic);
//     socket.theTopic = topic;

//     console.log("Connected Count", connectedCount, allSockets.length);
//   });

//   socket.on("chat sendStatus", statusTxt => {
//     console.log("Server sending  the STATUS", statusTxt);
//     io.emit("chat setStatusTxt", statusTxt);
//   });
// });


// TODO: change to POST and use req.body
app.get("/login", function(req, res) {
  var user = { username: req.query.username, pass: req.query.pass };
  UserService.checkLogin(user).then(userFromDB => {
    if (userFromDB) {
      console.log("Login!");
      delete userFromDB.pass;
      req.session.user = userFromDB;

      res.json({ token: "Beareloginr: puk115th@b@5t", user: userFromDB });
    } else {
      console.log("Login NOT Succesful");
      req.session.user = null;
      res.json(403, { error: "Login failed" });
    }
  });
});

app.get("/logout", function(req, res) {
  req.session.reset();
  res.end("Loggedout");
});

app.get("/profile", requireLogin, (req, res) => {
  res.send("Connected User: " + req.session.user.username);
});

function requireLogin(req, res, next) {
  if (!req.session.user) {
    console.log("Login Required");
    res.json(403, { error: "Please Login" });
  } else {
    next();
  }
}
