const DBService = require("./DBService");
const mongo = require("mongodb");

function query(criteria = {}) {
  var regExVal = new RegExp("^" + (criteria.text || ".*"), "ig");
  criteria.text = { $regex: regExVal };
  var matchQuery = {
    $match: {
      $or: [
        { "topic.subtitle": criteria.text },
        { "topic.title": criteria.text },
        { "teacher.fullName": criteria.text }
      ]
    }
  };
  if (criteria.maxprice || criteria.topics) matchQuery.$match.$and = [];
  if (criteria.maxprice && criteria.minprice) {
    matchQuery.$match.$and.push({
      pricePerHour: { $gt: +criteria.minprice, $lt: +criteria.maxprice }
    });
  }
  if (criteria.topics) {
    matchQuery.$match.$and.push({
      "topic.subtitle": {
        $in: Array.isArray(criteria.topics)
          ? criteria.topics
          : [criteria.topics]
      }
    });
  }

  var sort = {};
  switch (criteria.sort) {
    case "lowPrice":
      var sort = { pricePerHour: 1 };
      break;
    case "highPrice":
      var sort = { pricePerHour: -1 };
      break;
    default:
      var sort = { rating: -1 };
      break;
  }
  var sortValue = { $sort: sort };

  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate([
          {
            $lookup: {
              from: "user",
              localField: "teacherId",
              foreignField: "_id",
              as: "teacher"
            }
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
          matchQuery,
          sortValue
        ])
        .toArray((err, teacherTopics) => {
          if (err) return reject(err);
          resolve(teacherTopics);
        });
    });
  });
}

function add(teacherTopic) {
  var teacherIdObj = mongo.ObjectID(teacherTopic.teacherId);
  var topicIdObj = mongo.ObjectID(teacherTopic.topicId);
  teacherTopic.teacherId = teacherIdObj;
  teacherTopic.topicId = topicIdObj;
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db.collection("teacherTopic").insert(teacherTopic, (err, res) => {
        if (err) return reject(err);
        resolve(res.ops);
        db.close();
      });
    });
  });
}

function remove(teacherTopicId) {
  var teacherTopicIdObj = mongo.ObjectID(teacherTopicId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .deleteOne({ _id: teacherTopicIdObj }, function(err, res) {
          if (err) reject(err);
          else resolve();
          db.close();
        });
    });
  });
}

function update(teacherTopic) {
  teacherTopic._id = new mongo.ObjectID(teacherTopic._id);
  var teacherIdObj = mongo.ObjectID(teacherTopic.teacherId);
  var topicIdObj = mongo.ObjectID(teacherTopic.topicId);
  teacherTopic.teacherId = teacherIdObj;
  teacherTopic.topicId = topicIdObj;
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .updateOne({ _id: teacherTopic._id }, teacherTopic, function(
          err,
          updatedTeacherTopic
        ) {
          if (err) reject(err);
          else resolve(updatedTeacherTopic);
          db.close();
        });
    });
  });
}

// gets a specific teacherTopic by _id
function getById(teacherTopicId) {
  teacherTopicId = new mongo.ObjectID(teacherTopicId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate([
          {
            $lookup: {
              from: "user",
              localField: "teacherId",
              foreignField: "_id",
              as: "teacher"
            }
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
            $match: { _id: teacherTopicId }
          }
        ])
        .toArray((err, teacherTopic) => {
          if (err) return reject(err);
          resolve(teacherTopic);
        });
    });
  });
}

// gets a specific all topics for a specific teacher by teacherId
function getTeacherTopicsById(teacherId) {
  teacherId = new mongo.ObjectID(teacherId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate([
          {
            $lookup: {
              from: "user",
              localField: "teacherId",
              foreignField: "_id",
              as: "teacher"
            }
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
            $match: { "teacher._id": teacherId }
          }
        ])
        .toArray((err, teacherTopics) => {
          if (err) return reject(err);
          resolve(teacherTopics);
        });
    });
  });
}

// gets a specific all topics for a specific teacher by teacherId
function getTopicsByTopicId(topicId) {
  topicId = new mongo.ObjectID(topicId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate([
          {
            $lookup: {
              from: "user",
              localField: "teacherId",
              foreignField: "_id",
              as: "teacher"
            }
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
            $match: { "topic._id": topicId }
          }
        ])
        .toArray((err, teacherTopics) => {
          if (err) return reject(err);
          resolve(teacherTopics);
        });
    });
  });
}

// gets a  all topics for a specific title
function getTopicsByTitle(title) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate([
          {
            $lookup: {
              from: "user",
              localField: "teacherId",
              foreignField: "_id",
              as: "teacher"
            }
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
            $match: { "topic.title": title }
          }
        ])
        .toArray((err, teacherTopics) => {
          if (err) return reject(err);
          resolve(teacherTopics);
        });
    });
  });
}

function getPopularTopics() {
  var allPopularTopics = [];
  return new Promise((resolve, reject) => {
    var popularTopicsPrms = [];
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate([
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
          { $group: {_id : "$topic.title" , count: { $sum: 1 }}},
          { $limit: 3 },
          { $sort: { count: -1 } }
        ])
        .toArray((err, popularTopics) => {
          if (err) return reject(err);
          const promises = popularTopics.map(topic =>
            getTopicsByTitle(topic._id)
          );
          Promise.all(promises).then(arrayOfTopics => {
            resolve(arrayOfTopics);
          });
        });
    });
  });
}

module.exports = {
  query,
  add,
  remove,
  update,
  getById,
  getTeacherTopicsById,
  getPopularTopics
};
