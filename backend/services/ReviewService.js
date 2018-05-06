const DBService = require('./DBService')
const mongo = require('mongodb');

function query(criteria = {}) {
    criteria.name = {$regex : `.*${criteria.name}.*`};
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('reviews').find(criteria).toArray((err, reviews) => {
                    if (err) return reject(err);
                    resolve(reviews);
                })
            })

    });
}

function add(review) {
    return new Promise((resolve, reject) => {
        return DBService.dbConnect()
            .then(db => {
                db.collection('review').insert(review, (err, res) => {
                    if (err) return reject(err);
                    resolve(res.ops);
                    db.close();
                })
            })
    });
}

function remove(reviewId) {
    console.log(reviewId); 
    var reviewIdObj = mongo.ObjectID(reviewId);
    console.log(reviewIdObj);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('reviews').deleteOne({_id: reviewIdObj}, function (err, res) {
                if (err)    reject(err)
                else        resolve();
                db.close();
            });
        })
    });
}

function update(review) {
    review._id = new mongo.ObjectID(review._id);

    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('reviews').updateOne({_id : review._id}, review, function (err, updatedReview) {
                if (err)    reject(err)
                else        resolve(updatedReview);
                db.close();
            });
        })
    });
}

function getById(reviewId) {
    // reviewId = new mongo.ObjectID(reviewId);
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('review').find({teacherTopicId: reviewId}).toArray(function (err, reviews) {
                // console.log('reviews in DB:', reviews);
                if (err)    reject(err)
                else        resolve(reviews);
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