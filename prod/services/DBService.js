// var DB_URL = 'mongodb://localhost:27017/teachit_db';
var DB_URL = 'mongodb://root:Aa123456@ds119060.mlab.com:19060/teachit_db'; 
const mongo = require('mongodb');

var MongoClient = mongo.MongoClient;

function dbConnect() {
    var prmConnect = new Promise((resolve, reject)=>{
        MongoClient.connect(DB_URL, function (err, db) {
           if (err) reject(err);
           else {
               resolve(db);
           }
        });
    });
    prmConnect.catch(err => console.error('Cannot Connect!', err))
    return prmConnect;
}

module.exports = {
    dbConnect
}