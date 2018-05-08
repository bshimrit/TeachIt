const DBService = require('./DBService')
const mongo = require('mongodb');

function query(criteria = {}) {
    // criteria.name = {$regex : `.*${criteria.name}.*`};
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('chat').find(criteria).toArray((err, chats) => {
                    if (err) return reject(err);
                    delete chats.password
                    console.log(chats);
                    resolve(chats);
                })
            })
    });
}

function add(chat) {
    
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
        .then(db => {
                db.collection('chat').insert(chat, (err, res) => {
                    if (err) return reject(err);
                    console.log('the:',res.ops);
                    resolve(res.ops);
                    db.close();
                })
            })
    });
}

function remove(chatId) {
    console.log(chatId); 
    var chatIdObj = mongo.ObjectID(chatId);
    console.log(chatIdObj);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('chat').deleteOne({_id: chatIdObj}, function (err, res) {
                if (err)    reject(err)
                else        resolve();
                db.close();
            });
        })
    });
}

function update(chat) {
    chat._id = new mongo.ObjectID(chat._id);

    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('chat').updateOne({_id : chat._id}, chat, function (err, updatedChat) {
                if (err)    reject(err)
                else        resolve(updatedChat);
                db.close();
            });
        })
    });
}

function getById(chatId) {
    chatId = new mongo.ObjectID(chatId);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('chat').findOne({_id: chatId}, function (err, chat) {
                if (err)    reject(err)
                else        resolve(chat);
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