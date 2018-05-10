const DBService = require('./DBService')
const mongo = require('mongodb');

function query(criteria = {}) {
    //criteria.name = {$regex : `.*${criteria.name}.*`};
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('topic').find().toArray((err, topics) => {
                    if (err) return reject(err);
                    resolve(topics);
                })
            })

    });
}

function add(topic) {
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('topic').insert(topic, (err, res) => {
                    if (err) return reject(err);
                    resolve(res.ops);
                    db.close();
                })
            })
    });
}

function remove(topicId) {
    var topicIdObj = mongo.ObjectID(topicId);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('topic').deleteOne({_id: topicIdObj}, function (err, res) {
                if (err)    reject(err)
                else        resolve();
                db.close();
            });
        })
    });
}

function update(topic) {
    topic._id = new mongo.ObjectID(topic._id);

    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('topic').updateOne({_id : topic._id}, topic, function (err, updatedTopic) {
                if (err)    reject(err)
                else        resolve(updatedTopic);
                db.close();
            });
        })
    });
}

function getById(topicId) {
    topicId = new mongo.ObjectID(topicId);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('topic').findOne({_id: topicId}, function (err, topic) {
                if (err)    reject(err)
                else        resolve(topic);
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