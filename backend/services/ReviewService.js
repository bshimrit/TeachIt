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
    review.teacherId = mongo.ObjectID(review.teacherId);
    review.userId = mongo.ObjectID(review.userId);
    if (review.teacherTopicId) review.teacherTopicId = mongo.ObjectID(review.teacherTopicId);
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
    var reviewIdObj = mongo.ObjectID(reviewId);
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

function getByTeacherTopicId(teacherTopicId) {
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('review').aggregate([
                {
                    $lookup:
                        {
                            from: 'user',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user'
                        }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup:
                        {
                            from: 'user',
                            localField: 'teacherId',
                            foreignField: '_id',
                            as: 'teacher'
                        }
                },
                {
                    $unwind: '$teacher'
                },
                {
                    $match: {'teacherTopicId': new mongo.ObjectID(teacherTopicId)}
                },
                {
                    $sort: {'_id':-1}
                }
                ]).toArray(function (err, reviews) {
                    if (err)    reject(err)
                    else        resolve(reviews);
                    db.close();
                });
        })
    });
}

function getByTeacherId(teacherId) {
    return new Promise((resolve, reject)=>{
        DBService.dbConnect()
        .then(db=>{
            db.collection('review').aggregate([
                {
                    $lookup:
                        {
                            from: 'user',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user'
                        }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup:
                        {
                            from: 'user',
                            localField: 'teacherId',
                            foreignField: '_id',
                            as: 'teacher'
                        }
                },
                {
                    $unwind: '$teacher'
                },
                {
                    $match: {'teacherId': new mongo.ObjectID(teacherId)}
                },
                { 
                    $sort: {'_id':-1}
                }
                ]).toArray(function (err, reviews) {
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
    getByTeacherTopicId,
    getByTeacherId
}