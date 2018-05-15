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
      pricePerHour: { $gt: +criteria.minprice, $lt: +criteria.maxprice}
    })
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
  var nearValue = null;
  if (criteria.geolocation){
    curLocations = criteria.geolocation.split(',')
    nearValue =  {
      $geoNear: {
         near: { type: "Point", coordinates: [+curLocations[0],+curLocations[1]]},
         distanceField: "topicLocation",
         maxDistance: 2000,
         num: 50,
         spherical: true
      }
    }
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

  var aggregates = baseAggregates();
  aggregates.push(matchQuery,sortValue);
  if (nearValue) aggregates.unshift(nearValue)
  
  return new Promise((resolve, reject) => {
    return DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate(aggregates)
        .toArray((err, teacherTopics) => {
          if (err) return reject(err);
          resolve(teacherTopics);
        });
    });
  });
}

function baseAggregates(){
  return [{
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
  }];
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

  var aggregates = baseAggregates();
  aggregates.push({
    $match: { _id: teacherTopicId }
  });

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate(aggregates)
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
  var aggregates = baseAggregates();
  aggregates.push({
    $match: { "teacher._id": teacherId }
  });

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate(aggregates)
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

  var aggregates = baseAggregates();
  aggregates.push({
    $match: { "topic._id": topicId }
  });

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate(aggregates)
        .toArray((err, teacherTopics) => {
          if (err) return reject(err);
          resolve(teacherTopics);
        });
    });
  });
}

// gets a  all topics for a specific title
function getTopicsByTitle(title) {
  var aggregates = baseAggregates();
  aggregates.push({
    $match: { "topic.title": title }
  });

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("teacherTopic")
        .aggregate(aggregates)
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
