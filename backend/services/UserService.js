const DBService = require('./DBService')
const mongo = require('mongodb');

// function checkLogin(creds) {
//     return new Promise((resolve, reject) => {
//         getUsers()
//             .then(users => {
//                 const user = users.find(user => user.email === creds.email
//                     && user.password === creds.password)
//                 if (user) resolve(user)
//                 else reject('wrong details')
//             })
//     })
// }

function query(criteria = {}) {
    // criteria.name = {$regex : `.*${criteria.name}.*`};
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('user').find(criteria).toArray((err, users) => {
                    if (err) return reject(err);
                    resolve(users);
                })
            })

    });
}

function add(user) {
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('user').insert(user, (err, res) => {
                    if (err) return reject(err);
                    console.log('the:'+res.ops);
                    resolve(res.ops);
                    db.close();
                })
            })
    });
}

function remove(userId) {
    console.log(userId); 
    var userIdObj = mongo.ObjectID(userId);
    console.log(userIdObj);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('user').deleteOne({_id: userIdObj}, function (err, res) {
                if (err)    reject(err)
                else        resolve();
                db.close();
            });
        })
    });
}

function update(user) {
    user._id = new mongo.ObjectID(user._id);

    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('user').updateOne({_id : user._id}, user, function (err, updatedUser) {
                if (err)    reject(err)
                else        resolve(updatedUser);
                db.close();
            });
        })
    });
}

function getById(userId) {
    userId = new mongo.ObjectID(userId);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('user').findOne({_id: userId}, function (err, user) {
                if (err)    reject(err)
                else        resolve(user);
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