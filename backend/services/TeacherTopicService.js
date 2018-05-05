const DBService = require('./DBService')
const mongo = require('mongodb');

function query(criteria = {}) {
    var regExVal = new RegExp('^' + criteria.text,"ig");
    criteria.text = {$regex : regExVal};
    // if (criteria.sortByTopic) {
    //     criteria.sort = {topicId: criteria.sortByTopic}
    // } else if (!criteria.sort) {
    //     criteria.sort = {rating: -1};
    // } 

    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('teacherTopic').aggregate([
                    {
                        $lookup:
                            {
                                from: "user",
                                localField: "teacherId",
                                foreignField: "_id",
                                as: "teacher"
                            },
                    },
                    {
                        $unwind: "$teacher"
                    },
                    {
                        $lookup: {
                            from: "topic",
                            localField: "topicId",
                            foreignField: "_id",
                            as: "topic"
                        }
                    },
                    {
                        $unwind: "$topic"
                    },
                    {
                        $match: { $or: [{ 'topic.subtitle': criteria.text },
                                        { 'topic.title': criteria.text },                
                                        {'teacher.name':criteria.text}
                        ]}
                    }
                    ]).toArray((err, teacherTopics) => {
                    if (err) return reject(err);
                    resolve(teacherTopics);
                })
            })
    });
}

function add(teacherTopic) {
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('teacherTopic').insert(teacherTopic, (err, res) => {
                    if (err) return reject(err);
                    resolve(res.ops);
                    db.close();
                })
            })
    });
}

function remove(teacherTopicId) {
    console.log(teacherTopicId); 
    var teacherTopicIdObj = mongo.ObjectID(teacherTopicId);
    console.log(teacherTopicIdObj);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('teacherTopic').deleteOne({_id: teacherTopicIdObj}, function (err, res) {
                if (err)    reject(err)
                else        resolve();
                db.close();
            });
        })
    });
}

function update(teacherTopic) {
    teacherTopic._id = new mongo.ObjectID(teacherTopic._id);

    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('teacherTopic').updateOne({_id : teacherTopic._id}, teacherTopic, function (err, updatedTeacherTopic) {
                if (err)    reject(err)
                else        resolve(updatedTeacherTopic);
                db.close();
            });
        })
    });
}

function getById(teacherTopicId) {
    teacherTopicId = new mongo.ObjectID(teacherTopicId);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('teacherTopics').findOne({_id: teacherTopicId}, function (err, teacherTopic) {
                if (err)    reject(err)
                else        resolve(teacherTopic);
                db.close();
            });
        })
    });
}

module.exports = {
    query,
    add,
    remove,
    update,
    getById
}