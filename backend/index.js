const express = require('express');
const bodyParser = require('body-parser');
const cors = require('express-cors');

const app = express()
app.use(cors({
    allowedOrigins: [
        'localhost:8080', '127.0.0.1:8080'
    ]
}))
app.use(bodyParser());

const addUserRoutes = require ('./routes/UserRoute')
addUserRoutes(app)
const addReviewRoutes = require ('./routes/ReviewRoute')
addReviewRoutes(app)
const addTopicRoutes = require ('./routes/TopicRoute')
addTopicRoutes(app)
const addTeacherTopicRoutes = require ('./routes/TeacherTopicRoute')
addTeacherTopicRoutes(app)

app.listen(3000, 
    () => console.log('Example app listening on port 3000!')
)

