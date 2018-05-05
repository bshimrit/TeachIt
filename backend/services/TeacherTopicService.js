const DBService = require('./DBService')
const mongo = require('mongodb');

function query(criteria = {}) {
    //criteria.name = {$regex : `.*${criteria.name}.*`};
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('teacherTopic').find().sort({rating: -1}).toArray((err, teacherTopics) => {
                    // console.log(teacherTopics)
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